window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
    var words = elements[i].getAttribute('data-elements');
    var period = elements[i].getAttribute('data-period');
    if (words) {
      new TxtType(elements[i], JSON.parse(words), period);
    }
  }
};

var TxtType = function(el, words, period) {
  this.el = el;
  this.words = words;
  this.cicle = 0;
  this.period = parseInt(period, 10) || 1000;
  this.txt = '';
  this.isDeleting = false;
  this.writing();
};

TxtType.prototype.writing = function() {
  var i = this.cicle % this.words.length;
  var fullTxt = this.words[i];

  if (this.isDeleting) this.txt = fullTxt.substring(0, this.txt.length - 1)
  else this.txt = fullTxt.substring(0, this.txt.length + 1)

  this.el.innerHTML = '<span class="line-writter">'+this.txt+'</span>'

  var velocityWords = 100 - Math.random() * 50

  if (this.isDeleting) velocityWords /= 2

  if (!this.isDeleting && this.txt === fullTxt) {
    velocityWords = this.period
    this.isDeleting = true
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false
    this.cicle++
  }
  setTimeout(() => { this.writing() }, velocityWords)
};