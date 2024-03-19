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
        var heroInfoHtml = '<div class="col-md-4">';
        heroInfoHtml += '<div class="card">';
        heroInfoHtml += '<img class="card-img-top" src="' + hero.image.url + '" alt="' + hero.name + '">';
        heroInfoHtml += '<div class="card-body">';
        heroInfoHtml += '<h5 class="card-title">' + hero.name + '</h5>';
        heroInfoHtml += '<p class="card-text">Intelligence: ' + hero.powerstats.intelligence + '</p>';
        heroInfoHtml += '<p class="card-text">Strength: ' + hero.powerstats.strength + '</p>';
        heroInfoHtml += '<p class="card-text">Speed: ' + hero.powerstats.speed + '</p>';
        heroInfoHtml += '<p class="card-text">Durability: ' + hero.powerstats.durability + '</p>';
        heroInfoHtml += '<p class="card-text">Power: ' + hero.powerstats.power + '</p>';
        heroInfoHtml += '<p class="card-text">Combat: ' + hero.powerstats.combat + '</p>';
        heroInfoHtml += '<p class="card-text">Occupation: ' + hero.work.occupation + '</p>';
        heroInfoHtml += '<p class="card-text">Base: ' + hero.work.base + '</p>';
        heroInfoHtml += '<p class="card-text">Aliases: ' + hero.biography.aliases.join(', ') + '</p>';
        heroInfoHtml += '<p class="card-text">Alignment: ' + hero.biography.alignment + '</p>';
        heroInfoHtml += '<p class="card-text">Publisher: ' + hero.biography.publisher + '</p>';
        heroInfoHtml += '<p class="card-text">First Appearance: ' + hero.biography['first-appearance'] + '</p>';
        heroInfoHtml += '<p class="card-text">Gender: ' + hero.appearance.gender + '</p>';
        heroInfoHtml += '<p class="card-text">Race: ' + hero.appearance.race + '</p>';
        heroInfoHtml += '<p class="card-text">Height: ' + hero.appearance.height.join(', ') + '</p>';
        heroInfoHtml += '<p class="card-text">Weight: ' + hero.appearance.weight.join(', ') + '</p>';
        heroInfoHtml += '</div></div></div>';
        $('#heroInfo').html(heroInfoHtml);
        renderChart(hero.powerstats);
    }
    
    

    function renderChart(powerstats) {
        var chartData = [];
        for (var stat in powerstats) {
            chartData.push({ y: parseInt(powerstats[stat]), label: stat });
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
            }]
        });
        chart.render();
    }
    
});
