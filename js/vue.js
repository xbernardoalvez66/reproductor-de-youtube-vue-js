var vm = new Vue ({
	el:'main',
	data:{
		busqueda:'',
		laURL:'',
		elTitulo:'',
		videoActivo:'',
		mostrar: false,
		alternar: true,
		videos:[],
	},
	created () {
         //Añade las pistas al objeto video
		this.videos = JSON.parse(localStorage.getItem("pistas"));
	},
	methods:{
		showTitulo:function(){
			if(this.laURL!='')
			this.mostrar=!this.mostrar;
		    setTimeout(function(){ $('#ttl').focus();}, 100);
		},
		addDatos:function(){
			if(this.elTitulo!='')
			this.mostrar=!this.mostrar;
		    this.videos.push({url:this.laURL, titulo:this.titulo, activo:false});

            localStorage.setItem('pistas',JSON.stringify(this.videos));
		    this.laURL = this.elTitulo = '';
		},
		playVideo:function(video){
			var laURL = video.url;
			var nuevaURL = laURL.replace('watch?v=', 'embed/');
			this.videoActivo = nuevaURL + '?&autoplay=1';
			for(i=0;i<this.videos.length;i++){
				this.videos[i].activo = false;
			},
        video.activo = true;
		},
		delVideo: function(video){
			this.videos.splice(this.videos.indexOf(video),1);
			localStorage.setItem('pistas', JSON.stringify(this.videos));
		},
		addSearch:function(){
			this.alternar = !this.alternar
		},
		ordenarAlfa:function(){
			this.videos.sort(function(a,b){
				if (a.titulo > b.titulo )
					return 1;
				else if (a.titulo < b.titulo)
					return -1;
				return 0;
		});
			
		}

	},
	computed:{
		buscarPorTitulo(){
			return this.videos.filter((busqueda) => busqueda.titulo.includes(this.busqueda))

		},
	}

})