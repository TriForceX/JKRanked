if ! screen -list | grep -q "skirata_api"; then
    screen -dmLS skirata_api ./start.sh
fi
