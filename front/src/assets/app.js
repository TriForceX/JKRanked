function datatables(){
    $('#ffa_ranking').DataTable({
        "order": [[ 0, "asc" ]],
        "bLengthChange": false,
        "deferRender": true,
        "oLanguage": {
                    "sInfo": '',
                    "sInfoFiltered": ''
        },
        "aaSorting": [[ 1, 'desc' ]] // ?
    });

    $('#saber_ranking').DataTable({
        "order": [[ 0, "asc" ]],
        "bLengthChange": false,
        "deferRender": true,
        "oLanguage": {
                    "sInfo": '',
                    "sInfoFiltered": ''
        },
        "aaSorting": [[ 1, 'desc' ]] // ?
    });

    $('#full_force_ranking').DataTable({
        "order": [[ 0, "asc" ]],
        "bLengthChange": false,
        "deferRender": true,
        "oLanguage": {
                    "sInfo": '',
                    "sInfoFiltered": ''
        },
        "aaSorting": [[ 1, 'asc' ]] // ?
    });
}

setTimeout(datatables,500);

 /*
            var graph1 = getComputedStyle(document.documentElement).getPropertyValue('--primary');
            var graph2 = getComputedStyle(document.documentElement).getPropertyValue('--secondary');
            var graph3 = getComputedStyle(document.documentElement).getPropertyValue('--tertiary');
            var shadow = getComputedStyle(document.documentElement).getPropertyValue('--main-graph-line-color');
            var font = getComputedStyle(document.documentElement).getPropertyValue('--content-font-color');

            console.log(font);
            console.log(hexToRgbA(font,1));
            console.log(addAlphaChannel(font, 1));

            Chart.defaults.global.legend.labels.usePointStyle = true;

            var randomScalingFactor = function()
            {
                var num = Math.floor(Math.random() * 99) + 1;
                return num *= Math.floor(Math.random() * 2) == 1 ? 1 : 1;
            };

            var randomScalingFactor2 = function()
            {
                return Math.round(Math.random() * 100);
            };

            var ctxBar = document.getElementById('chart-bar').getContext('2d');

            var gradient = ctxBar.createLinearGradient(0, 0, 0, 180);
            gradient.addColorStop(0, addAlphaChannel(graph1, 0.9));
            gradient.addColorStop(1, addAlphaChannel(graph1, 0.2));

            var gradient2 = ctxBar.createLinearGradient(0, 0, 0, 180);
            gradient2.addColorStop(0, addAlphaChannel(graph2, 0.9));
            gradient2.addColorStop(1, addAlphaChannel(graph2, 0.2));

            var gradient3 = ctxBar.createLinearGradient(0, 0, 0, 180);
            gradient3.addColorStop(0, addAlphaChannel(graph3, 0.9));
            gradient3.addColorStop(1, addAlphaChannel(graph3, 0.2));

            var configBar = {
                type: 'bar',
                data:
                {
                    labels: ['2019', '2020'],
                    datasets: [
                    {
                        label: 'D1',
                        backgroundColor: gradient, //addAlphaChannel(graph1, 0.70),
                        hoverBackgroundColor: addAlphaChannel(graph1, 0.70),
                        borderWidth: 2,
                        borderColor: addAlphaChannel(graph1, 0.8),
                        hoverBorderColor: addAlphaChannel(graph1, 1),
                        data: [
                            randomScalingFactor(),
                            randomScalingFactor(),
                            randomScalingFactor()
                        ]
                    },
                    {
                        label: 'D2',
                        backgroundColor: gradient2, //addAlphaChannel(graph2, 0.70),
                        hoverBackgroundColor: addAlphaChannel(graph2, 0.70),
                        borderWidth: 2,
                        borderColor: addAlphaChannel(graph2, 0.8),
                        hoverBorderColor: addAlphaChannel(graph2, 1),
                        data: [
                            randomScalingFactor(),
                            randomScalingFactor(),
                            randomScalingFactor()
                        ]
                    }]

                },
                options:
                {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend:
                    {
                        labels:
                        {
                            fontColor: addAlphaChannel(font, 1),
                            padding: 15
                        },
                        display: false,
                        position: 'bottom'
                    },
                    scales:
                    {
                        yAxes: [
                        {
                            gridLines:
                            {
                                color: addAlphaChannel(font, 0.1),
                                zeroLineColor: addAlphaChannel(font, 0.1)
                            },
                            ticks:
                            {
                                fontColor: addAlphaChannel(font, 1),
                                beginAtZero: true,
                                reverse: false,
                                stepSize: 20
                            }
                        }],
                        xAxes: [
                        {
                            gridLines:
                            {
                                color: addAlphaChannel(font, 0.1),
                                zeroLineColor: addAlphaChannel(font, 0.1)
                            },
                            ticks:
                            {
                                fontColor: addAlphaChannel(font, 1),
                                beginAtZero: true,
                                reverse: false
                            }
                        }]
                    },
                    title:
                    {
                        display: false
                    }
                }
            };


            var ctxLine = document.getElementById('chart-line').getContext('2d');

            var gradient = ctxLine.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, addAlphaChannel(graph1, 0.8));
            gradient.addColorStop(0.5, addAlphaChannel(graph1, 0.5));
            gradient.addColorStop(1, addAlphaChannel(graph1, 0));

            var gradient2 = ctxLine.createLinearGradient(0, 0, 0, 200);
            gradient2.addColorStop(0, addAlphaChannel(graph2, 0.8));
            gradient2.addColorStop(0.5, addAlphaChannel(graph2, 0.5));
            gradient2.addColorStop(1, addAlphaChannel(graph2, 0));

            var gradient3 = ctxLine.createLinearGradient(0, 0, 0, 200);
            gradient3.addColorStop(0, addAlphaChannel(graph3, 0.8));
            gradient3.addColorStop(0.5, addAlphaChannel(graph3, 0.5));
            gradient3.addColorStop(1, addAlphaChannel(graph3, 0));

            var configLine = {
                type: 'line',
                data:
                {
                    labels: [
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'
                    ],
                    datasets: [
                    {
                        data: [
                            randomScalingFactor(),
                            randomScalingFactor(),
                            randomScalingFactor(),
                            randomScalingFactor(),
                            randomScalingFactor(),
                            randomScalingFactor()
                        ],
                        label: 'Filled',
                        pointRadius: 1,
                        backgroundColor: gradient3, //addAlphaChannel(graph3, 0.70),
                        hoverBackgroundColor: addAlphaChannel(graph3, 0.90),
                        borderWidth: 2,
                        borderColor: addAlphaChannel(graph3, 0.8),
                        hoverBorderColor: addAlphaChannel(graph3, 1),
                        pointBackgroundColor: addAlphaChannel(graph3, 0.3)
                    }]
                },
                options:
                {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales:
                    {
                        yAxes: [
                        {
                            gridLines:
                            {
                                color: addAlphaChannel(font, 0.1),
                                zeroLineColor: addAlphaChannel(font, 0.1)
                            },
                            ticks:
                            {
                                fontColor: addAlphaChannel(font, 1),
                                beginAtZero: false,
                                reverse: false,
                                stepSize: 20
                            }
                        }],
                        xAxes: [
                        {
                            gridLines:
                            {
                                color: addAlphaChannel(font, 0.1),
                                zeroLineColor: addAlphaChannel(font, 0.1)
                            },
                            ticks:
                            {
                                fontColor: addAlphaChannel(font, 1),
                                beginAtZero: false,
                                reverse: false
                            }
                        }]
                    },
                    legend:
                    {
                        labels:
                        {
                            fontColor: addAlphaChannel(font, 1),
                            padding: 15
                        },
                        display: false,
                        position: 'bottom'
                    },
                    elements:
                    {
                        point:
                        {

                        }
                    }
                }
            };

            //Bar Chart
            window.myBar = new Chart(ctxBar, configBar);

            //Line Chart
            window.myLine = new Chart(ctxLine, configLine);



            document.getElementById('randomizeDataLine').addEventListener('click', function()
            {

                configLine.data.datasets.forEach(function(dataset)
                {
                    dataset.data = dataset.data.map(function()
                    {
                        return randomScalingFactor();
                    });
                });
                window.myLine.update();

            });

            document.getElementById('randomizeDataBar').addEventListener('click', function()
            {

                configBar.data.datasets.forEach(function(dataset)
                {
                    dataset.data = dataset.data.map(function()
                    {
                        return randomScalingFactor();
                    });
                });
                window.myBar.update();

            });

            function addAlphaChannel(rgb, alpha)
            {
                if (rgb.indexOf("#") >= 0)
                { //Is Hex
                    rgb = hexToRgbA(rgb, alpha);
                }
                if (rgb.indexOf("rgba") >= 0)
                {
                    var lastComma = rgb.lastIndexOf(',');
                    var newBGColor = rgb.slice(0, lastComma + 1) + alpha + ")";
                }
                else
                {
                    var oldBGColor = rgb; //rgb(100,100,100)
                    var newBGColor = oldBGColor.replace('rgb', 'rgba').replace(')', ', ' + alpha + ')'); //rgba(100,100,100,.8)
                }
                return newBGColor;
            }

            function hexToRgbA(hex, alpha = 1) {
                const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
                return `rgba(${r},${g},${b},${alpha})`;
            }


            
            
           
            $("#sparkline" + 0).sparkline([1,-1,1,-1,1,1,1,-1,-1,1],
            {
                type: 'bar',
                height: '19px',
                barColor: graph3,
                negBarColor: graph2
            });

            $("#sparkline" + 1).sparkline([1,-1,1,-1,1,1,1,-1,-1,1],
            {
                type: 'bar',
                height: '19px',
                barColor: graph3,
                negBarColor: graph2
            });
            */