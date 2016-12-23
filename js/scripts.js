var app = new Moon({
  el: '#app',
  data: {
    msg: 'Hello Moon!'
  }
});

var app2 = new Moon({
  el: '#app2',
  data: {
    msg: 'Hello Moon!'
  }
});

var app3 = new Moon({
  el: '#app3',
  data: {
    msg: 'Hello Moon!'
  },
  methods: {
    change: function() {
      app3.set('msg', 'Changed the Value!');
    }
  }
});

app3.method('change');

var app6 = new Moon({
  el: '#app6',
  data: {
    msg: 'Hello Moon!'
  }
});

app6.set('msg', 'New Message!');

var app7_count = 0;

var app7 = new Moon({
  el: '#app7',
  data: {
    count: app7_count
  },
  methods: {
    increment: function() {
      app7_count++;
      app7.set('count', app7_count);
    }
  }
});

app7.method('increment');

var app8 = new Moon({
  el: '#app8',
  data: {
    msg: 'Hello Moon!'
  }
});

app8.destroy();