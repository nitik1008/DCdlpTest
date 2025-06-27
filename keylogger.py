import pynput
from pynput.keyboard import KeyCode, Key, Controller,Listener
from pynput.mouse import Button, Controller, Listener

# Create log files
keyboard_log_file = "keyboard_log.txt"
mouse_log_file = "mouse_log.txt"

def on_press(key):
    """Record key presses"""
    with open(keyboard_log_file, "a") as f:
        f.write(f"{key} pressed\n")

def on_release(key):
    """Stop recording when Esc key is pressed"""
    if key == Key.esc:
        # Stop listener
        return False

def on_move(x, y):
    """Record mouse movement"""
    with open(mouse_log_file, "a") as f:
        f.write(f"Pointer moved to ({x}, {y})\n")

def on_click(x, y, button, pressed):
    """Record mouse clicks"""
    if pressed:
        with open(mouse_log_file, "a") as f:
            f.write(f"{button} pressed at ({x}, {y})\n")
    else:
        with open(mouse_log_file, "a") as f:
            f.write(f"{button} released at ({x}, {y})\n")

def on_scroll(x, y, dx, dy):
    """Record mouse scrolls"""
    with open(mouse_log_file, "a") as f:
        f.write(f"Pointer scrolled {'down' if dy < 0 else 'up'} at ({x}, {y})\n")

# Create keyboard and mouse listeners
keyboard_listener = Listener(on_press=on_press, on_release=on_release)
mouse_listener = Listener(on_move=on_move, on_click=on_click, on_scroll=on_scroll)

# Start listeners
keyboard_listener.start()
mouse_listener.start()

# Join listeners
keyboard_listener.join()
mouse_listener.join()