if ! screen -list | grep -q "skirata_web"; then
    screen -dmLS skirata_web ./start.sh
fi
