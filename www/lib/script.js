window.onload = function(){
  const cadastrar = document.querySelector("#cadastrar");
  const nome = document.querySelector("#nome");
  const curso = document.querySelector("#curso");
  const buscar = document.querySelector("#buscar");
  const id = document.querySelector("#id");
  const alterar = document.querySelector("#alterar");
  const deletar = document.querySelector("#deletar");

//ação de cadastrar uma pessoa e curso
  cadastrar.addEventListener("click", function(){
    let formdata = new FormData();
    formdata.append('nome',`${nome.value}`);
    formdata.append('curso',`${curso.value}`);
    
   fetch("https://www.jussimarleal.com.br/exemplo_api/pessoa",
   {
     body:formdata,
     method:"post",
     mode:'cors',
     cache:'default'
   }).then(()=>{
                alert("Registro efetuado com Sucesso");
                limparCampos();
        }
    
     );
  });
  //metodo que listar uma pessoa
  buscar.addEventListener("click", function(){
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
    method:"get",
     mode:'cors',
     cache:'default'
    }).then(response=>{
      response.json().then(data => {
        nome.value = data['nome'];
        curso.value = data['curso'];
      })
    })
  })
  //metodo para alterar os dados dos registros
  alterar.addEventListener("click", function(){
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
    method:"putt",
    mode:'cors',
     cache:'default',
     headers:{
       'Content-type': 'application/json; charset=UTF-8'
     },
     body:JSON.stringify({
       'nome':`${nome.value}`,
       'curso':`${curso.value}`,
     })
    }).then(()=>{
      
      alert("Registro Alterado com Sucesso")
       limparCampos();
    });
  });
  //metodo para deletar um registro
deletar.addEventListener("click", function(){
fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
    method:"delete",
     mode:'cors',
     cache:'default'
    }).then(()=>{
      alert("Registro alterado com sucesso!")
    limparCampos();
    });
})

  //metodo para limpar os campos
  function limparCampos(){
    nome.value = "";
    curso.value = "";
  }


document.querySelector("#code").addEventListener("click", function(){
     cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417,CODE_39", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );

});
}