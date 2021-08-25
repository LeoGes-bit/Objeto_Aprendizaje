$(document).ready(function(){

    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $('#login').click(function(){
        $('.login-form').addClass('popup');
    });

    $('.login-form form .fa-times').click(function(){
        $('.login-form').removeClass('popup');
    });

    $(window).on('load scroll',function(){

        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        $('.login-form').removeClass('popup');

        $('section').each(function(){

            let top = $(window).scrollTop();
            let height = $(this).height();
            let id = $(this).attr('id');
            let offset = $(this).offset().top - 200;

            if(top > offset && top < offset + height){
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }


        });

    });

}); 


window.onload = function () {
  
    var questionArea = document.getElementsByClassName('questions')[0],
        answerArea   = document.getElementsByClassName('answers')[0],
        checker      = document.getElementsByClassName('checker')[0],
        current      = 0,
    
       // An object that holds all the questions + possible answers.
       // In the array --> last digit gives the right answer position
        allQuestions = {
          '¿Qué quiere decir HTML?' : 
          ['Es un lenguaje que da estilos y colores a una página web',
           'Es un lenguaje de maquetado que sirve para estructurar una página web', 
           'Es un lenguaje de programación que permite que una página web sea dinámica',
            1],
          
          '¿Cuál es el lenguaje estándar específico para aplicar estilos de presentación a nuestras páginas web?' :
           ['JavaScript', 
           'HTML' ,
            'CSS', 
            2],
          
          '¿Cuál crees que es la mejor manera de aplicar estilos a una página web?' : 
          ['Incluir los estilos en las etiquetas HTML para que se carguen y ejecuten antes', 
          'Incluirlos en un fichero externo vinculado a ese fichero HTML' , 
          'Incluirlos en la sección cabecera para agruparlos en un mismo sitio en la misma página',
           1],
          
           '¿En qué lugar se ejecuta generalmente el código JavaScript?' :
           ['Servidor', 
           'Cliente (en el propio navegador de internet)' ,           
            1],

            '¿Cuáles de estas son marcas para la inserción del código JavaScript en las páginas HTML?' :
           ['< javascript _code > y < /javascript_code >', 
           '< script > y < /script >', 
           '< ?script > y < script? >',           
            1],
            
            'La llamada al código Javascript debe colocarse en:' :
           ['La sección Body de la página', 
           'Antes de la etiqueta HTML', 
           'Puede colocarse en la sección Head o en Body',           
            2],

            '¿Cuál es la instrucción usada para devolver un valor en una función de JavaScript?' :
            ['Return', 
            'Send', 
            'Value',           
             0],

             '¿Cuál de estas instrucciones está correctamente escrita en Javascript?' :
             ['if (a==0) alert (a);', 
             'if (a=0) print a;', 
             'if (a==0) { print [a] }', 
              0],

              'Para concatenar cadenas de caracteres en Javascript se usa el carácter:' :
              ['& (ampersand)', 
              '+ (más)', 
              '. (punto)', 
              '* (por)', 
               1],

          
        };
        
    function loadQuestion(curr) {
    // This function loads all the question into the questionArea
    // It grabs the current question based on the 'current'-variable
    
      var question = Object.keys(allQuestions)[curr];
      
      questionArea.innerHTML = '';
      questionArea.innerHTML = question;    
    }
    
    function loadAnswers(curr) {
    // This function loads all the possible answers of the given question
    // It grabs the needed answer-array with the help of the current-variable
    // Every answer is added with an 'onclick'-function
    
      var answers = allQuestions[Object.keys(allQuestions)[curr]];
      
      answerArea.innerHTML = '';
      
      for (var i = 0; i < answers.length -1; i += 1) {
        var createDiv = document.createElement('div'),
            text = document.createTextNode(answers[i]);
        
        createDiv.appendChild(text);      
        createDiv.addEventListener("click", checkAnswer(i, answers));
        
        
        answerArea.appendChild(createDiv);
      }
    }
    
    function checkAnswer(i, arr) {
      // This is the function that will run, when clicked on one of the answers
      // Check if givenAnswer is sams as the correct one
      // After this, check if it's the last question:
      // If it is: empty the answerArea and let them know it's done.
      
      return function () {
        var givenAnswer = i,
            correctAnswer = arr[arr.length-1];
        
        if (givenAnswer === correctAnswer) {
          addChecker(true);             
        } else {
          addChecker(false);                        
        }
        
        if (current < Object.keys(allQuestions).length -1) {
          current += 1;
          
          loadQuestion(current);
          loadAnswers(current);
        } else {
          questionArea.innerHTML = 'Evaluación Finalizada';
          answerArea.innerHTML = '';
        }
                                
      };
    }
    
    function addChecker(bool) {
    // This function adds a div element to the page
    // Used to see if it was correct or false
    
      var createDiv = document.createElement('div'),
          txt       = document.createTextNode(current + 1);
      
      createDiv.appendChild(txt);
      
      if (bool) {
        
        createDiv.className += 'correct';
        checker.appendChild(createDiv);
      } else {
        createDiv.className += 'false';
        checker.appendChild(createDiv);
      }
    }
    
    
    // Start the quiz right away
    loadQuestion(current);
    loadAnswers(current);
    
  };