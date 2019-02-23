document.addEventListener('keydown', function(evento){

	if(evento.keyCode == 32){
		if (nivel.pausa==true){

		}else{
			if (nivel.muerto==false){
				if (personaje.y>10){
					saltar();
				}
			   	
			}else{
				tierra=true;
				aire=false;
				nivel.velocidad=9;
				obstaculo.x=ancho+100;
				obstaculoA.x=ancho+100;
				nivel.puntuacion=0;
				suelog.x=-40;
				nivel.muerto=false;
			}
		}
		
		
	}

	if (evento.keyCode == 13){
		if(nivel.pausa==false){
			contexto.font = "10 px impact";
			contexto.fillStyle = '#ffffff';
			contexto.fillText('pausa',600,200);
			nivel.velocidad=0;
			FPS=0;
			nivel.pausa=true;
	    }else{
	    	FPS=50;
	    	nivel.velocidad=9;
	    	nivel.pausa=false;
	    	
	    }
		
		
	}
})

//cargar imagenes--------------------------------
var imgPersonaje,imgObstaculo,imgFondo,imgPropulsor,imgObstaculoAire;

function cargarImagenes(){
	imgFondo=new Image();
	imgFondo.src = "imagenes/Mapa2.jpg";
	imgPersonaje = new Image();
	imgPersonaje.src = "imagenes/Caminar.gif";
	imgObstaculo = new Image();
	imgObstaculo.src = "imagenes/obstaculo.png";
	imgPropulsor=new Image();
	imgPropulsor.src = "imagenes/propulsor.png";
	imgObstaculoAire=new Image();
	imgObstaculoAire.src = "imagenes/nave.png";
	
}

//funciones ------------------------------------
var ancho=1142;
var alto=572;
var canvas,contexto;

function inicializar(){
	canvas =document.getElementById('canvas');
	contexto = canvas.getContext('2d');
	cargarImagenes();
}

function borrarCanvas(){
	canvas.width=ancho;
	canvas.height=alto;

}

var suelo=310;
var personaje = {y: suelo, vy:0, gravedad:2, salto:25, vymax:9, saltando:false};
var nivel = {velocidad:9, puntuacion:0, muerto:false, pausa:false};
var obstaculo={x:ancho+100 , y:suelo+10}
var obstaculoA={x:ancho+100 , y:50}
var suelog={x:1142, y:suelo};

function dibujar(){
	contexto.drawImage(imgFondo,suelog.x,0,5120,2880,0,0,5000,572);
	contexto.drawImage(imgPropulsor,0,0,2400,2247,80,personaje.y,100,100);
	contexto.drawImage(imgPersonaje,0,0,200,200,100,personaje.y,200,200);
	if (tierra==true){
		contexto.drawImage(imgObstaculo,0,0,506,733,obstaculo.x,obstaculo.y,300,250);
	}else{
		contexto.drawImage(imgObstaculoAire,0,0,1600,925,obstaculoA.x,obstaculoA.y,300,200);
	}
	
	
}

function logicaSuelo(){
	if(suelog.x>3000){
		suelog.x=20;
	}
	else{
		if(nivel.muerto==true || nivel.pausa==true){
			suelog.x+=0;
		}else{
			suelog.x+=1;
		}
		
	}
}
var tierra=true;
var aire=false;
function logicaObstaculo(){
	if(tierra==true){
		if(obstaculo.x<-300){
			tierra=false;
			aire=true;
			obstaculo.x= ancho+100;
			nivel.puntuacion+=1;
		}else{
		obstaculo.x-= nivel.velocidad;
	    }
	}else{
		if(obstaculoA.x<-300){
			tierra=true;
			aire=false;
			obstaculoA.x= ancho+100;
			nivel.puntuacion+=1;
		}else{
			obstaculoA.x-= nivel.velocidad;
		}
	}

	

	
}

function saltar(){
	personaje.saltando=true;
	personaje.vy=personaje.salto;
}

function gravedad(){
	if (personaje.saltando==true){
		if(personaje.y - personaje.vy - personaje.gravedad> suelo){
			personaje.saltando=false;
			personaje.vy=0;
			personaje.y=suelo;
		}else{
			personaje.vy-=personaje.gravedad;
			personaje.y-=personaje.vy;
		}
		
	}
}
//logica colision
function colision(){
	if(obstaculo.x<=180 && obstaculo.x>=80){
		if(personaje.y>=suelo-25 && personaje.y<=320){
			nivel.muerto=true;
			nivel.velocidad=0;
		}
	}
	if(obstaculoA.x<=180 && obstaculo.x>=120){
		if(personaje.y>=0 && personaje.y<=250){
			nivel.muerto=true;
			nivel.velocidad=0;
		}
	}
}

//funcion puntaje---------------------------------
function puntuacion(){
	contexto.font = "10 px impact";
	contexto.fillStyle = '#000000';
	contexto.fillText(nivel.puntuacion,600,50);
	contexto.fillText('PUNTUACION',600,20);
	if(nivel.muerto==true){
		contexto.font = "60 px impact";
		contexto.fillStyle = '#ff0000';
		contexto.fillText('GAME OVER',240,150);
	}
}
//bucle principal---------------------------------
var FPS=50;
setInterval(function(){

	principal();
},1000/FPS)

function principal(){
	borrarCanvas();
	gravedad();
	colision();
	logicaSuelo()
	logicaObstaculo();
	dibujar();
	puntuacion();
}

function iniciar(){
	var modal = document.getElementById("modal");
	modal.style.display = "none";
	inicializar();
	principal();
	
}


