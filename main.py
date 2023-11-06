def on_button_pressed_a():
    global mode
    mode = 0
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_received_string(receivedString):
    global signal
    if mode == 1:
        signal = radio.received_packet(RadioPacketProperty.SIGNAL_STRENGTH)
        led.plot_bar_graph(Math.map(signal, -95, -50, 0, 9), 9)
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    global mode
    mode = 1
input.on_button_pressed(Button.B, on_button_pressed_b)

degrees = 0
signal = 0
mode = 0
radio.set_transmit_power(2)
radio.set_group(84)
mode = 1

def on_forever():
    radio.send_string("2")
    basic.pause(200)
basic.forever(on_forever)

def on_forever2():
    global degrees
    while mode == 0:
        degrees = input.compass_heading()
        if input.compass_heading() < 45:
            basic.show_string("N")
        elif input.compass_heading() < 135:
            basic.show_string("E")
        elif input.compass_heading() < 225:
            basic.show_string("S")
        elif input.compass_heading() < 315:
            basic.show_string("W")
        else:
            basic.show_string("N")
basic.forever(on_forever2)
