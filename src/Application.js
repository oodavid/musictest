import AudioManager;
import device;
GLOBAL.gx = Math.ceil(device.width/20);
import ui.TextView as TextView;
import ui.TextPromptView as TextPromptView;

var barLength = localStorage.getItem('barlength') || 1000;

exports = Class(GC.Application, function () {

  this.initUI = function () {
    // Create the audio
    this.audio = new AudioManager({
      path: 'resources/sounds',
      files: {
        intro:    { path: 'music', background: true, volume: 1, loop: false },
        map:      { path: 'music', background: true, volume: 1, loop: true  },
        map2game: { path: 'music', background: true, volume: 1, loop: false },
        game:     { path: 'music', background: true, volume: 1, loop: true  },
        game2map: { path: 'music', background: true, volume: 1, loop: false }
      }
    });
    // To set the bar length
    this.barPrompt = new TextPromptView({
      prompt: "Enter the milliseconds per bar"
    });
    this.barLengthText = new TextView({
      superview: this.view,
      text: "Bar Length: "+barLength+"ms, click to change",
      color: "white",
      x: 0,
      y: (gx),
      width: device.width,
      height: (gx*2)
    });
    this.barLengthText.on('InputStart', bind(this, function(){
      this.barPrompt.showPrompt();
    }));
    this.barPrompt.on('Change', bind(this, function(value){
      barLength = value; // localStorage.getItem('barlength') || 1000;
      localStorage.setItem('barlength', value);
      this.barLengthText.setText("Bar Length: "+barLength+"ms, click to change");
    }));
    // The buttons
    this.intro = new TextView({
      superview: this.view,
      text: "PLAY LOOP",
      color: "white",
      x: 0,
      y: (gx*5),
      width: device.width,
      height: (gx*2)
    });
    this.map = new TextView({
      superview: this.view,
      text: "JUMP TO TIME",
      color: "white",
      x: 0,
      y: (gx*13),
      width: device.width,
      height: (gx*2)
    });
    this.game = new TextView({
      superview: this.view,
      text: "GET INFO (see console)",
      color: "white",
      x: 0,
      y: (gx*9),
      width: device.width,
      height: (gx*2)
    });



    // The logic
    this.intro.on('InputStart', function(){
      GC.app.audio.play('map', { time: 2 });
    });
    this.game.on('InputStart', function(){
      // Wait till an appropriate moment and swap to the map
      console.log('isPaused',    GC.app.audio.isPaused('map'));
      console.log('isPlaying',   GC.app.audio.isPlaying('map'));
      console.log('getTime',     GC.app.audio.getTime('map'));
      console.log('getDuration', GC.app.audio.getDuration('map'));
      console.log('getExt',      GC.app.audio.getExt('map'));
    });
    this.map.on('InputStart', bind(this, function(){
      // Wait till an appropriate moment and swap to the map
      GC.app.audio.setTime('map', 1)
    }));













  };

  this.launchUI = function () {};
});
