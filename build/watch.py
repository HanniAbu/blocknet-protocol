import sys
import os
import time
import logging
from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler
from watchdog.events import FileSystemEventHandler
from build import runBuild

# Usage
# To Watch Current Directory, Type: python watch.py
# To Watch Specific Directory, Type: python watch.py "relativeDirectoryPath"
# API: https://pythonhosted.org/watchdog/api.html
# Reference: https://www.blog.pythonlibrary.org/2017/03/14/how-to-run-python-tests-continuously-while-coding/


class FW(FileSystemEventHandler):
    def __init__(self, test_file_path):
        self.test_file_path = test_file_path
 
    def on_any_event(self, event):
        runBuild()
        # time.sleep(3)
        return


if __name__ =='__main__':
    observer = Observer()
    path = sys.argv[1] if len(sys.argv) > 1 else '.'
    watcher = FW(path)
 
 
    observer.schedule(watcher, path, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
else:
    print("Watchdog Error")