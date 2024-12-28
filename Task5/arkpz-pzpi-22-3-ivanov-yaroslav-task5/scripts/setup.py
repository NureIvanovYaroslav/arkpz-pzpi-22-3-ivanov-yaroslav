import sys

from db_password_check import check_database_password
from nodejs_install import run_nodejs_setup
from npm_install import install_npm_dependencies
from npm_run import start_npm_dev_server

# Main function to run the setup process
def main():
    try:
        check_database_password()
        run_nodejs_setup()
        install_npm_dependencies()
        start_npm_dev_server()
    except Exception as e:
        print(f"An error occurred: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()