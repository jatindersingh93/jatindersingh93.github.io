$(function() { 
    var localData = "data.json";
    var slide = 0;
    var maxSlide = 2;
    var aniDuration = 2000;
    var delay = 1000;
    var last_vote_timestamp = null; 
    // this will hold images if one is being disabled.
    var voted_image = [];
    var SHOW_VOTING_IMAGE = true;
    var themeData = [];
    var finalistsData = [];
    var timer = [];     
    $( document ).ready(function() {
       var request = $.ajax({
            xhrFields: {
                withCredentials: true
            },      
           data: { get_param: 'value' }, 
           success: function (data) {
               finalistsData = data;
               console.log(finalistsData);
               createHtml(slide);
            },            
            url: localData
        });
        //setInterval(latestVote, 3000);         
        //setInterval(displayVote, 9000);         
    });
       
    function createHtml(slide){
        resetTimer();
        data = finalistsData;        
        var cropImages = '';
        console.log(slide);
        var j = 1;
        $('body').attr('class','')

        
        $.each(data, function(key, field){   

            
            $('.entries .d').html(data['entries']['digits']);
            $('.entries .en').html(data['entries']['text']['eng']);            
           // $('.entries .fr').html(data['entries']['text']['fra']);                        
            
            $('.selected .d').html(data['selected']['digits']);
            $('.selected .en').html(data['selected']['text']['eng']);            
            //$('.selected .fr').html(data['selected']['text']['fra']);               
            
            $('.months .d').html(data['months']['digits']);
            $('.months .en').html(data['months']['text']['eng']);            
            //$('.months .fr').html(data['months']['text']['fra']);  
            
            $('.award .d').html(data['award']['digits']);
            $('.award .en').html(data['award']['text']['eng']);            
            //$('.award .fr').html(data['award']['text']['fra']);  
            
            $('.message .en').html(data['message']['text']['eng']);            
            //$('.message .fr').html(data['message']['text']['fra']);  
            
            if(key == "winners"){              
                //add remove orientation class
                $('body').toggleClass(data[key][slide]['orientation']);
                
                $('.votes .d').html(data[key][slide]['votes']['digits']);
                $('.votes .en').html(data[key][slide]['votes']['text']['eng']);            
                //$('.votes .fr').html(data[key][slide]['votes']['text']['fra']);        
                
                $('.award-image img').attr('src', data[key][slide]['url']);
                $('.photo-info .en .title').html(data[key][slide]['title']['eng']);                      
                $('.photo-info .en .photographer').html(data[key][slide]['photographer']['eng']);   
                $('.photo-info .en .description').html(data[key][slide]['description']['eng']);                      
                $('.photo-info .fr .title').html(data[key][slide]['title']['fra']);                      
                $('.photo-info .fr .photographer').html(data[key][slide]['photographer']['fra']);   
                $('.photo-info .fr .description').html(data[key][slide]['description']['fra']);                    
            }
        });
        startAnimating();
    }                      

    function startAnimating(){
        // show logo
        $('.logo img').fadeTo(aniDuration, 0.99);
        $('.award-text div').each(function(index, element){                
	       $(element).delay(delay).fadeTo(aniDuration, 0.99);
           delay += 300;
        });
        delay = 1000; //reset
        
        // hide award text
        timer.push( 
            setTimeout(hideAwardText, aniDuration * 3) 
        );
           
        // hide everything and show image
        timer.push(
             setTimeout(showImage, aniDuration * 5)                 
            );
        
        timer.push(
            setTimeout( reset, aniDuration * 10)
            );
       
    }
    
    function hideAwardText(){
        $('.award-text div').fadeTo(aniDuration, 0);
        $('.message').fadeTo(aniDuration, 0.99);     
    }
    function showImage(){
        $('.logo img').fadeTo(aniDuration, 0);
        $('.message').fadeTo(aniDuration, 0);
        $('.award-image img').delay(delay * 2).fadeTo(aniDuration, 0.99);
        $('.photo-info').delay(delay * 4).fadeTo(aniDuration, 0.99);   
    }
    function reset(){
        slide++;
        
        if(slide > maxSlide){
            slide = 0;
        }        
        $('.photo-info').fadeTo(aniDuration, 0);  
        $('.award-image img').delay(delay).fadeTo(aniDuration, 0, function(){
            createHtml(slide);
        });        
        
    }

    function resetTimer(){
            for (var i = 0; i < timer.length; i++)
            {
                clearTimeout(timer[i]);
            }
        timer = [];
    }
    
});  