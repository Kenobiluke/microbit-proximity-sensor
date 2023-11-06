input.onButtonPressed(Button.A, function () {
    mode = 0
})
radio.onReceivedString(function (receivedString) {
    if (mode == 1) {
        signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
        led.plotBarGraph(
        Math.map(signal, -95, -50, 0, 9),
        9
        )
    }
})
input.onButtonPressed(Button.B, function () {
    mode = 1
})
let degrees = 0
let signal = 0
let mode = 0
radio.setTransmitPower(2)
radio.setGroup(84)
mode = 1
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
