const back2top = (function () {
  return {
    id: null,
    setButtonId (buttonId) {
      back2top.id = $('#' + buttonId)[0];
    },
    commonStyles () {
      back2top.id.style.display = 'none';
      back2top.id.style.position = 'fixed';
      back2top.id.style.bottom = '20px';
      back2top.id.style.right = '30px';
      back2top.id.style.zIndex = '99';
      back2top.id.style.padding = '15px';
    },
    buttonStyle: {
      stylize () {
        back2top.commonStyles();
        back2top.id.style.fontSize = '18px';
        back2top.id.style.color = 'white';
        back2top.id.style.cursor = 'pointer';
        back2top.id.style.borderRadius = '4px';
      },
      createButton () {
        let btn = document.createElement('button');
        let btnTxt = document.createTextNode('Top');
        btn.appendChild(btnTxt);

        let btnId = 'back2topBtn';
        btn.setAttribute('id', btnId);
        btn.setAttribute('title', 'Go to top');
        btn.setAttribute('class', 'btn btn-primary');
        document.body.appendChild(btn);

        back2top.setButtonId(btnId);
        back2top.buttonStyle.stylize();
      }
    },
    arrowStyle: {
      stylize () {
        back2top.commonStyles();
        back2top.id.style.border = 'solid black';
        back2top.id.style.borderWidth = '0 3px 3px 0';
        back2top.id.style.transform = 'rotate(-135deg)';
        back2top.id.style.webkitTransform = 'rotate(-135deg)';
      },
      createArrowUp () {
        let arrow = document.createElement('i');
        let btnId = 'back2topBtn';
        arrow.setAttribute('id', btnId);
        document.body.appendChild(arrow);

        back2top.setButtonId(btnId);
        back2top.arrowStyle.stylize();
      }
    },
    scrollFunction () {
      window.onscroll = function () {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
          back2top.id.style.display = 'block';
        } else {
          back2top.id.style.display = 'none';
        }
      };
    },
    topFunction () {
      back2top.id.onclick = function () {
        $('html, body').animate({scrollTop: 0}, 600);
      };
    },
    main (option) {
      if (option !== undefined) {
        if (option.styleName === 'arrowUp') {
          back2top.arrowStyle.createArrowUp();
        } else {
          back2top.buttonStyle.createButton();
        }
      } else {
        back2top.buttonStyle.createButton(); // default style
      }
      back2top.scrollFunction();
      back2top.topFunction();
    }
  };
})();
back2top.main();
