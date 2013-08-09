(function($){

  var loadData = function(name){
    var data = db.saved[name];
    for(x in data){
      $('#'+x).val(data[x]);
    }
  }

  var fuelCost = function(d, month, type){
    var mileage = d[type+'_mileage'];
    var unitprice = d[type+'_price']
    return d.monthly_distance/mileage*unitprice;
  }

  var serviceCost = function(d, month, type){
    if(month > 12 && month % 4 == 0)
      return d[type + '_service_cost'];
    return 0;
  }

  var calculate = function(){
    var d = {};
    $('form input').each(function(i,x){d[this.id]=parseFloat($(x).val());});
    var results = [];
    var pcost = d.petrol_onroad;
    var dcost = d.diesel_onroad;
    for(var month=12;month<=15*12;month++){
      pcost = pcost + fuelCost(d,month, 'petrol') + serviceCost(d,month,'petrol');
      dcost = dcost + fuelCost(d,month, 'diesel') + serviceCost(d,month,'diesel');
      results.push([
        '<tr class="', dcost <= pcost ? 'success':'','">',
        '<td>', formatMonth(month), '</td>',
        '<td>', numberWithCommas(pcost) , '</td>',
        '<td>', numberWithCommas(dcost) , '</td></tr>'
      ].join(''));
    }

    $('#results table').remove();
    $('#table-template')
      .clone()
      .append(results.join(''))
      .appendTo('#results')
      .show();
  }

  var formatMonth = function(month){
    var year = parseInt(month/12);
    var month = month%12;
    var r = [];
    r.push(year);
    r.push(year > 1 ? 'years':'year');

    if(month>0){
      r.push(month);
      r.push(month > 1 ? 'months':'month');
    }
    return r.join(' ');
  }

  var numberWithCommas = function(x) {
    var r = [];
    var c = 3;
    x=Math.round(x);
    while(x>0){
      r.push(x%10);
      x=parseInt(x/10);
      c--;
      if(c==0 && x>0){
        c=2;
        r.push(',');
      }
    }
    return r.reverse().join('');
  }

  $(function(){
    var nodes = [];
    for(x in db.saved){
      nodes.push('<li><a href="#">' + x +'</a></li>');
    }
    $('#saved_list').append(nodes.join(''));

    $('#saved_list').on('click','a', function(e){
      loadData($(this).text());
      e.preventDefault();
    });

    $('#calculate').click(function(){
      calculate();
      $('#projection_tab').tab('show');
    });
  })
})(jQuery)
