input.onButtonPressed(Button.A, function () {
    mode = 0
})
radio.onReceivedString(function (receivedString) {
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    if (mode == 1) {
        if (Group == 1) {
            if (receivedString == "1") {
                led.plotBarGraph(
                Math.map(signal, -95, -50, 0, 9),
                9
                )
            }
        } else if (Group == 2) {
            if (receivedString == "2") {
                led.plotBarGraph(
                Math.map(signal, -95, -50, 0, 9),
                9
                )
            }
        } else if (Group == 3) {
            if (receivedString == "3") {
                led.plotBarGraph(
                Math.map(signal, -95, -50, 0, 9),
                9
                )
            }
        } else {
            basic.pause(100)
        }
    }
})
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    if (mode == 1) {
        if (Group <= 4) {
            Group += 1
        } else {
            Group = 1
        }
    }
    mode = 1
    basic.showString("" + (Group))
})
let degrees = 0
let signal = 0
let mode = 0
let Group = 0
Group = 1
radio.setTransmitPower(2)
radio.setGroup(84)
mode = 1
basic.showString("" + (Group))
basic.forever(function () {
    radio.sendString("2")
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
