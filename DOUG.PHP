<div class="form-group">
                  <label class="col-sm-4 control-label" for="name">Dia de pago</label>
                  <div class="col-sm-8">
                  <SELECT NAME="selCombo"  SIZE=1 onchange="fetch_select(this.value);">
                <OPTION VALUE="1">LUNES</OPTION>
                <OPTION VALUE="2">MARTES</OPTION>
                <OPTION VALUE="3">MIERCOLES</OPTION>
                <OPTION VALUE="4">JUEVES</OPTION>
<OPTION VALUE="5">VIERNES</OPTION>
<OPTION VALUE="6">SÁBADO</OPTION>
<OPTION VALUE="7">DOMINGO</OPTION>
<OPTION VALUE="8" >QUINCENA</OPTION>
<OPTION VALUE="9" >MENSUAL</OPTION>
<OPTION VALUE="0" >INDEFINIDO</OPTION>
                </SELECT>
                
                
<script>
function fetch_select(val)
{

   $.ajax({
     type: 'post',
     url: 'functionCreditos.php',
     data: {
       get_option:val,

     },
     success: function (response) {
       document.getElementById("selComboCreditos2").innerHTML=response;
     }
   });
document.getElementById("selComboSigDiaPago2").value = val;

}

</script>

