module.exports = () => {
  //addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
  (function(win, doc){
    if(win.addEventListener)return;		//No need to polyfill

    function docHijack(p){var old = doc[p];doc[p] = function(v){return addListen(old(v))}}
    function addEvent(on, fn, self){
      return (self = this).attachEvent('on' + on, function(e){
        var e = e || win.event; // eslint-disable-line
        e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
        e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
        fn.call(self, e);
      });
    }
    function addListen(obj, i){
      if (i = obj.length)while(i--)obj[i].addEventListener = addEvent; // eslint-disable-line
      else obj.addEventListener = addEvent;
      return obj;
    }

    addListen([doc, win]);
    if('Element' in win)win.Element.prototype.addEventListener = addEvent;			//IE8
    else{																			//IE < 8
      doc.attachEvent('onreadystatechange', function(){addListen(doc.all)});		//Make sure we also init at domReady
      docHijack('getElementsByTagName');
      docHijack('getElementById');
      docHijack('createElement');
      addListen(doc.all);
    }
  })(window, document);

  // Source: https://github.com/Alhadis/Snippets/blob/master/js/polyfills/IE8-child-elements.js
  if(!("nextElementSibling" in document.documentElement)){
      Object.defineProperty(Element.prototype, "nextElementSibling", {
          get: function(){
              var e = this.nextSibling;
              while(e && 1 !== e.nodeType)
                  e = e.nextSibling;
              return e;
          }
      });
  }
}
