# Start App locally

## Setup
theHarvester app is built in python so having you should have the python
compiler installed. After you install the python compiler install go to
the `theHarvester` directory and create and activate the virtual environment
```shell
cd ./theHarvester
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements/base.txt
```

## Running the backend
The backend app is gradle based kotlin Spring app, so it need java 21 to be 
installed on your local machine. gradle installation is not required because
`./gradlew` file will make the app work anyway.

```shell
./gradlew bootRun
```

**NOTE:** in dev mode the application will automatically start the database from
the `./compose.yaml` file