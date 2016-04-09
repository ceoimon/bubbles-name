/**
 * ONLY COMPATIBLE FOR MODERN BROWSER
 * @author ceoimon <me@ceoimon.com> (http://ceoimon.com/)
 */
;(function (global) {
  /**
   * Encode the params.
   * @param {Object} params - Parameters to encode.
   * @return {string} The encoded parameters.
   */
  function encodeParams (params) {
    if (!params instanceof Object) {
      throw new Error('Error in encodeParams(): TypeError: The first argument MUST be a Object!')
    }
    let arr = []
    for (let param in params) {
      if (typeof params[param] !== 'string') {
        console.warn(`Warning in encodeParams(): "${param}" should be a String`)
        continue
      }
      arr.push(`${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`)
    }
    return arr.join('&')
  }

  /**
   * A jQuery.ajax like function implemented by ceoimon, only support "get" and "post" method.
   * @param is required {Object} obj - The request config.
   * @param is required {string} obj.url - The request url.
   * @param {string=} obj.method - The request method, only support "get" and "post"
   * @param {Object=} obj.params - The request parameters.
   * @param {string=} obj.dataType - Expected response's datatype.
   * @param {boolean=} obj.asyn - Request asynchronously or not.
   * @param {boolean=} obj.cache - Request use cache or not.
   * @callback obj.success - The callback that handles the response when success.
   * @callback obj.error - The callback that handles the response when error.
   */
  function ajax ({
    url,
    method = 'get',
    params = '',
    dataType = 'text',
    asyn = true,
    cache = false,
    success = () => {},
    error = (err) => { console.error(err) }
  }) {
    const MIME = {
      xml: 'text/xml',
      html: 'text/html',
      js: 'text/javascript',
      text: 'text/plain',
      json: 'application/json'
    }
    // Type verification.
    if (!url) {
      throw new Error('Error in ajax(): TypeError: You MUST pass a url to request!')
    }
    if (typeof method !== 'string') {
      throw new Error(`Warning in ajax(): TypeError: "method" should be a String instead of ${typeof method}`)
    }
    method = method.toLowerCase()
    if (method !== 'get' && method !== 'post') {
      throw new Error(`Error in ajax(): TypeError: Not support ${method} method!`)
    }
    if (params instanceof Object) {
      params = encodeParams(params)
    } else {
      console.warn(`Warning in ajax(): "params" should be a Object instead of ${typeof params}`)
      params = ''
    }
    if (typeof dataType !== 'string') {
      throw new Error(`Warning in ajax(): TypeError: "dataType" should be a String instead of ${typeof method}`)
    }
    dataType = dataType.toLowerCase()
    if (MIME[dataType] === 'undefined') {
      throw new Error(`Error in ajax(): TypeError: Type ${dataType} Not support!`)
    }
    dataType = MIME[dataType]
    if (typeof asyn !== 'boolean') {
      console.warn(`Warning in ajax(): "asyn" should be a Boolean instead of ${typeof asyn}`)
      asyn = true
    }
    if (typeof asyn !== 'boolean') {
      console.warn(`Warning in ajax(): "cache" should be a Boolean instead of ${typeof asyn}`)
      cache = false
    }
    if (typeof success !== 'function') {
      console.warn(`Warning in ajax(): "success" should be a Funciton instead of ${typeof success}`)
      success = () => {}
    }
    if (typeof error !== 'function') {
      console.warn(`Warning in ajax(): "error" should be a Boolean instead of ${typeof error}`)
      error = (err) => { console.error(err) }
    }

    const XHR = new global.XMLHttpRequest()

    if (!cache) {
      // Clear the cache.
      url = `${url}?rand=${Math.random()}`
    }
    // If request method is "get", add params as query strings to URL.
    if (method === 'get') {
      url += url.indexOf('?') === -1
      ? `?${params}`
      : `&${params}`
    }

    // If request asynchronously, listen the "readystatechange" event.
    if (asyn === true) {
      XHR.onreadystatechange = () => {
        // Call callback when request completed.
        if (XHR.readyState === 4) {
          callback()
        }
      }
    }

    XHR.open(method, url, asyn)

    if (method === 'post') {
      // If request method is "post", set request header.
      XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      XHR.send(params)
    } else {
      XHR.send(null)
    }

    // If request synchronously, call callback.
    if (asyn === false) {
      callback()
    }

    // Handle response code
    function callback () {
      if (XHR.status === 200) {
        let mime = XHR.getResponseHeader('Content-Type')
        mime = mime ? mime.split(';')[0].toLowerCase() : 'text/plain'
        if (mime === dataType) {
          if (mime === MIME['xml']) {
            success(XHR.responseXML)
          } else {
            success(XHR.responseText)
          }
        } else {
          error(`Something went wrong:
            Response code: ${XHR.status}
            Error message: "dataType" not match!`)
        }
      } else {
        error(`Something went wrong:
          Response code: ${XHR.status}
          Response message: ${XHR.statusText}`)
      }
    }
  }

  /** JWMIS Class. */
  const JWMIS = () => {}
  /** Initialization, deal with event listeners etc. */
  JWMIS.prototype.init = () => {
    const formElement = global.document.querySelector('.form')
    const messageElement = global.document.querySelector('.divLogNote .message')
    const statusElement = global.document.querySelector('#status')
    const labelIDElement = global.document.querySelector('.label-ID')
    const IDElement = global.document.querySelector('#ID')
    const passwordElement = global.document.querySelector('#password')
    const VCElement = global.document.querySelector('#VC')
    const ulb2Element = global.document.querySelector('.fucking-ugly-button2')

    const resetTheMessageElement = () => {
      messageElement.innerText = ''
      formElement.removeEventListener('keydown', resetTheMessageElement)
    }
    const toggleFormDisabled = (tof) => {
      statusElement.disabled = tof
      labelIDElement.disabled = tof
      passwordElement.disabled = tof
      VCElement.disabled = tof
    }

    formElement.addEventListener('submit', (e) => {
      const _target = e.target
      // To prevent re-submit.
      _target.disabled = true
      toggleFormDisabled(true)
      e.preventDefault()
      const formData = {
        status: statusElement.value,
        ID: IDElement.value,
        password: passwordElement.value,
        VC: VCElement.value
      }
      ajax({
        url: '/jwmis/login',
        method: 'post',
        params: formData,
        asyn: true,
        cache: true,
        dataType: 'json',
        success: (data) => {
          const _data = JSON.parse(data)
          if (_data.success === 1) {
            global.document.location = '/jwmis'
          } else if (_data.success === 0) {
            _target.disabled = false
            toggleFormDisabled(false)
            const type = _data.type
            switch (type) {
              case 'status':
                messageElement.innerText = '帐号不存在！请重新输入。'
                VCElement.value = ''
                statusElement.focus()
                break
              case 'ID':
                messageElement.innerText = '帐号不正确！请重新输入。'
                IDElement.value = ''
                passwordElement.value = ''
                VCElement.value = ''
                IDElement.focus()
                break
              case 'password':
                messageElement.innerText = '密码不正确！请重新输入。'
                passwordElement.value = ''
                VCElement.value = ''
                passwordElement.focus()
                break
              case 'VC':
                messageElement.innerText = '验证码不正确！请重新输入。'
                VCElement.value = ''
                VCElement.focus()
                break
              default:
                console.error(`Unhandled response type: ${type}`)
            }
          }
        },
        error: (err) => { console.error(err) }
      })
      messageElement.innerText = '正在通过身份验证...请稍候!'
      formElement.addEventListener('keydown', resetTheMessageElement)
    })

    statusElement.addEventListener('change', (e) => {
      const status = e.target.value
      if (status !== 'STU') {
        ulb2Element.value = '重置'
        ulb2Element.classList.add('fucking-ugly-button')
      } else {
        ulb2Element.value = '忘记密码'
        ulb2Element.classList.remove('fucking-ugly-button')
      }
      switch (status) {
        case 'STU':
          labelIDElement.innerText = '学　号'
          break
        case 'TEA':
          labelIDElement.innerText = '工　号'
          break
        case 'SYS':
        case 'ADM':
          labelIDElement.innerText = '帐　号'
          break
        default:
          break
      }
    })
  }
  const jwmis = new JWMIS()
  jwmis.init()
}(window))
