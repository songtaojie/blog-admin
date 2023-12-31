const topics = {
  _all: []
};
const _allList = [];
/*
	 * 判断一个元素是否在数组中
	 * */
const inArray = function (item, arr) {
  // 不是数组则跳出
  if (!isArray(arr)) {
    return false;
  }
  // 遍历是否在数组中
  for (let i = 0, k = arr.length; i < k; i++) {
    if (item == arr[i]) {
      return true;
    }
  }
  return false;
};

// 循环检测是否有all事件需要被执行
const loopCheck = function (topic) {
  if (!inArray(topic, _allList)) {
    return;
  }
  let _all = topics._all;
  for (let i = 0; i < _all.length; i++) {
    let temp = _all[i];
    if (temp && inArray(topic, _all[i].events) && !inArray(topic, _all[i].finished)) {
      _all[i].finished.push(topic);
    }
    if (temp && _all[i].events.length == _all[i].finished.length) {
      let callbackInfo = [];
      for (let j = 0; j < _all[i].events.length; j++) {
        let _topic = _all[i].events[j];
        callbackInfo.push(topics[_topic].info);
      }
      let callback = _all[i].callback;
      if (callback) {
        callback.apply(this, callbackInfo);
      }
    }
  }
};
/*
 * 判断一个对象是否为数组
 * */
let isArray = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

let events = {
  on: function (topic, listener) {
    // 如果没有创建,则创建一个topic对象
    if (!topics[topic]) {
      topics[topic] = { queue: [], result: 0, info: null };
    }

    // 添加监听器到队列中
    let index = topics[topic].queue.push(listener) - 1;

    // 提供移除topic的句柄(对象)
    return ( function (topic, index) {
      return {
        off: function () {
          delete topics[topic].queue[index];
        }
      };
    } )(topic, index);
  },
  emit: function (topic, ...info) {
    // 如果 topic 不存在,或者队列中没有监听器,则 return
    if (!topics[topic] || !topics[topic].queue.length) return;

    // 将数据缓存至变量
    topics[topic].result = 1;
    topics[topic].info = info;

    // 通过循环 topics 队列, 触发事件
    let items = topics[topic].queue;
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item) {
        item(...info);
      }
    }

    loopCheck(topic);

  },
  all: function () {
    let args = arguments, eventArr = [], callback;
    for (let i = 0; i < args.length; i++) {
      let event = args[i];
      if (typeof event == "string" && !inArray(event, eventArr)) {
        eventArr.push(event);
        _allList.push(event);
      } else if (isArray(event)) {
        for (let j = 0; j < event.length; j++) {
          if (typeof event[j] == "string" && !inArray(event[j], eventArr)) {
            eventArr.push(event[j]);
            _allList.push(event[j]);
          }
        }
      }
    }

    // 取出回调方法
    if (typeof args[args.length - 1] == "function") {
      callback = args[args.length - 1];
    }

    let allEvent = {
      events: eventArr,
      finished: [],
      callback: callback
    };

    let index = topics._all.push(allEvent) - 1;

    // 提供移除topic的句柄(对象)
    return ( function (topic, index) {
      return {
        off: function () {
          delete topic[index];
        }
      };
    } )(topics._all, index);
  },
  debug: function () {
    if (console && console.log) console.log(topics);
  }
};

export default {
  events
}