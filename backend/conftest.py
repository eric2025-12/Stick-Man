import sys
import os

# Add the backend directory ( this is wher utils/ lives) to Python path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)
 