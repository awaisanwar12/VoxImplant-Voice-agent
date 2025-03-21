function simpleStringify(object) {
  const simpleObject = Object.keys(object)
    .filter((item) => typeof object[item] === 'string')
    .reduce((acc, item) => {
      acc[item] = object[item];
      return acc;
    }, {});
  return JSON.stringify(simpleObject);
}

// Logging into a text area
const Logger = function (element) {
  const logRecords = [];
  const textArea = element;
  this.write = function (logRecord) {
    logRecords.push(logRecord.toString());
    render();
  };
  this.clear = function () {
    logRecords.length = 0;
    textArea.value = '';
  };

  function render() {
    textArea.value = logRecords.join('\r\n');
    textArea.scrollTop = textArea.scrollHeight;
  }
};

const isIosSafari = () => {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  return iOS && webkit;
};

const isFirefox = () => {
  return !!window.navigator.userAgent.match(/Firefox/i);
};

const isCameraMicrophone = (microphone, cameraList) => {
  return microphone.group
    ? Boolean(cameraList.find((cam) => cam.group === microphone.group))
    : false;
};

/**
 *
 * @param {Element} element
 */
const removeChildren = (element) => {
  [...element.children].forEach((child) => {
    element.removeChild(child);
  });
};
