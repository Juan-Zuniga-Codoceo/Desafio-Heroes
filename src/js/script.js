$(document).ready(function(){
    $('#searchForm').submit(function(event){
        event.preventDefault();
        var heroNumber = $('#heroNumber').val().trim();
        if(!heroNumber.match(/^\d+$/)) {
            alert('Ingresa solo números.');
            return;
        }
        $.ajax({
            url: 'https://www.superheroapi.com/api.php/4905856019427443/' + heroNumber,
            type: 'GET',
            success: function(response) {
                renderHeroInfo(response);
            },
            error: function() {
                alert('Error al buscar el SuperHéroe.');
            }
        });
    });

    function renderHeroInfo(hero) {
        var heroInfoHtml = '<div class="row">';
        heroInfoHtml += '<div class="col-md-6">';
        heroInfoHtml += '<img class="card-img-top small-image mb-1" src="' + hero.image.url + '" alt="' + hero.name + '">';
        heroInfoHtml += '</div>';
        heroInfoHtml += '<div class="col-md-6">';
        heroInfoHtml += '<h5 class="card-title">' + hero.name + '</h5>';
        heroInfoHtml += '<p class="card-text">Ocupación: ' + hero.work.occupation + '</p>';
        heroInfoHtml += '<p class="card-text">Base: ' + hero.work.base + '</p>';
        heroInfoHtml += '<p class="card-text">Alianzas: ' + hero.biography.aliases.join(', ') + '</p>';
        heroInfoHtml += '<p class="card-text">Publicado por: ' + hero.biography.publisher + '</p>';
        heroInfoHtml += '<p class="card-text">Primera Aparición: ' + hero.biography['first-appearance'] + '</p>';
        heroInfoHtml += '<p class="card-text">Genero: ' + hero.appearance.gender + '</p>';
        heroInfoHtml += '<p class="card-text">Raza: ' + hero.appearance.race + '</p>';
        heroInfoHtml += '<p class="card-text">Altura: ' + hero.appearance.height.join(', ') + '</p>';
        heroInfoHtml += '<p class="card-text">Peso: ' + hero.appearance.weight.join(', ') + '</p>';
        heroInfoHtml += '</div></div>';
        $('#heroInfo').html(heroInfoHtml);
        renderChart(hero.powerstats);
    }
    
    

    function renderChart(powerstats) {
        var chartData = [];
        for (var stat in powerstats) {
            chartData.push({ y: parseInt(powerstats[stat]), label: stat, legendText: stat });
        }
    
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: "Estadísticas del SuperHéroe"
            },
            data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##0\"%\"",
                indexLabel: "{label} {y}",
                dataPoints: chartData
            }],
            legend: {
                cursor: "pointer",
                itemclick: function (e) {
                    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                        e.dataSeries.visible = false;
                    } else {
                        e.dataSeries.visible = true;
                    }
                    e.chart.render();
                }
            }
        });
        chart.render();
    }
    
    
});
