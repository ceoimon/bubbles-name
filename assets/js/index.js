;(function () {
  var _is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  var attachFastClick = Origami.fastclick
  attachFastClick(document.body)
  var formElments = document.querySelectorAll('.mdl-textfield__input')
  function checkFocus (element, parentEle) {
    Boolean(element.querySelector(':focus'))
      ? parentEle.classList.add('is-focused')
      : parentEle.classList.remove('is-focused')
  }
  function checkValidity (element, parentEle) {
    element.validity && (element.validity.valid
      ? parentEle.classList.remove('is-invalid')
      : parentEle.classList.add('is-invalid'))
  }
  function checkDirty (element, parentEle) {
    element.value && element.value.length > 0
      ? parentEle.classList.add('is-dirty')
      : parentEle.classList.remove('is-dirty')
  }
  function updateClasses (element, parentEle) {
    checkValidity(element, parentEle)
    checkDirty(element, parentEle)
  }
  Array.prototype.forEach.call(formElments, function (element) {
    var parentEle = element.parentNode
    checkDirty(element, parentEle)
    element.addEventListener('input', function (e) {
      updateClasses(element, parentEle)
    })
    element.addEventListener('change', function (e) {
      updateClasses(element, parentEle)
    })
    element.addEventListener('reset', function (e) {
      updateClasses(element, parentEle)
    })
    element.addEventListener('focus', function (e) {
      parentEle.classList.add('is-focused')
    })
    element.addEventListener('blur', function (e) {
      if (e.target.value !== '') {
        parentEle.classList.add('is-dirty')
      } else {
        parentEle.classList.remove('is-dirty')
      }
      parentEle.classList.remove('is-focused')
    })
  })
  var container = document.querySelector('.canvas-container')
  var name = document.querySelector('#name')
  var nameParent = name.parentNode
  var width = document.querySelector('#width')
  var widthParent = width.parentNode
  var height = document.querySelector('#height')
  var heightParent = height.parentNode
  var form = document.querySelector('.form')

  var hideButton = document.querySelector('.hide-button')
  hideButton.addEventListener('click', function (e) {
    form.classList.toggle('is-hidden')
    if (form.classList.contains('is-hidden')) {
      e.target.innerText = 'Show configs'
    } else {
      e.target.innerText = 'Hide configs'
    }
  })

  if (_is_mobile) {
    var backToTop = document.createElement('span')
    backToTop.classList.add('back-to-top')
    document.body.appendChild(backToTop)
  }
  function drawName (e) {
    e.preventDefault()
    document.querySelector('#demo-canvas') && document.querySelector('#demo-canvas').remove()
    var myCanvas = document.createElement('canvas')
    myCanvas.setAttribute('id', 'demo-canvas')
    var _name = name.value
    var _width = width.value
    var _height = height.value
    if (_name === '') {
      nameParent.classList.add('is-invalid')
      name.focus()
      return
    }
    if (_width === '') {
      widthParent.classList.add('is-invalid')
      width.focus()
      return
    }
    if (_height === '') {
      heightParent.classList.add('is-invalid')
      height.focus()
      return
    }
    container.appendChild(myCanvas)
    ceoimon.drawString({
      element: document.querySelector('#demo-canvas'),
      string: _name,
      width: _width,
      height: _height,
      shape: 'circle'
    })
  }
  form.addEventListener('submit', drawName)
}())
