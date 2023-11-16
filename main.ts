radio.onReceivedNumber(function (receivedNumber) {
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    if (mode == 1) {
        if (recievingOptimal == Group) {
            led.plotBarGraph(
            Math.map(signal, -128, -60, 0, 9),
            9
            )
        }
    }
})
input.onButtonPressed(Button.A, function () {
    mode = 3
    if (recievingOptimal < 5) {
        recievingOptimal += 1
    } else {
        recievingOptimal = 1
    }
    basic.clearScreen()
    basic.showString("RO = " + recievingOptimal)
    mode = 1
})
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    if (mode == 1) {
        mode = 3
        if (Group <= 4) {
            Group += 1
            radio.sendNumber(10)
        } else {
            Group = 1
            radio.sendNumber(10)
        }
        basic.clearScreen()
        basic.showString("BC = " + Group)
        basic.pause(500)
        basic.clearScreen()
        radio.sendNumber(10)
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
let mode = 0
let Group = 0
let recievingOptimal = 0
recievingOptimal = 1
radio.setGroup(42)
led.setBrightness(255)
Group = 1
radio.setTransmitPower(1)
mode = 1
basic.pause(100)
basic.showString("" + (Group))
basic.forever(function () {
    radio.sendNumber(Group)
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
