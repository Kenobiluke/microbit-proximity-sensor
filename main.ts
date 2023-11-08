input.onButtonPressed(Button.A, function () {
    mode = 3
    basic.showString("M0")
    basic.pause(200)
    mode = 0
})
input.onButtonPressed(Button.AB, function () {
    setupComplete = 1
    basic.clearScreen()
})
radio.onReceivedString(function (receivedString) {
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    if (mode == 1) {
        if (receivedString == "73") {
            led.plotBarGraph(
            Math.map(signal, -95, -50, 0, 9),
            9
            )
        } else {
            basic.clearScreen()
        }
    }
})
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    if (mode == 1) {
        mode = 3
        if (Group <= 4) {
            radio.sendString("0")
            Group += 1
        } else {
            Group = 1
        }
        basic.clearScreen()
        basic.showString("" + (Group))
        basic.pause(500)
        basic.clearScreen()
        mode = 1
    } else {
        mode = 3
        basic.showString("M1")
        basic.pause(200)
        mode = 1
    }
})
let degrees = 0
let signal = 0
let setupComplete = 0
let mode = 0
let Group = 0
Group = 1
radio.setTransmitPower(2)
mode = 1
basic.pause(100)
basic.showString("" + (Group))
basic.forever(function () {
    radio.setGroup(Group + 49)
    radio.sendString("73")
    basic.pause(200)
})
basic.forever(function () {
    while (mode == 0) {
        degrees = input.compassHeading()
        if (input.compassHeading() < 45) {
            basic.showString("N")
        } else if (input.compassHeading() < 135) {
            basic.showString("E")
        } else if (input.compassHeading() < 225) {
            basic.showString("S")
        } else if (input.compassHeading() < 315) {
            basic.showString("W")
        } else {
            basic.showString("N")
        }
    }
})
