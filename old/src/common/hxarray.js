
import { isArray } from './index'
// 变量
var arrayPrototype = Array.prototype,
        slice = arrayPrototype.slice,
        supportsSplice = (function() {
            var array = [],
                lengthBefore,
                j = 20

            if (!array.splice) {
                return false
            }

            // This detects a bug in IE8 splice method:
            // see http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/
            // 6e946d03-e09f-4b22-a4dd-cd5e276bf05a/
            while (j--) {
                array.push('A')
            }

            array.splice(15, 0, 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F',
                         'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F')

            lengthBefore = array.length // 41
            array.splice(13, 0, 'XXX') // add one element

            if (lengthBefore + 1 !== array.length) {
                return false
            }
            // end IE8 bug

            return true
        }()),
        supportsIndexOf = 'indexOf' in arrayPrototype




const fixArrayIndex = function(array, index) {
    return index < 0 ? Math.max(0, array.length + index) : Math.min(array.length, index)
}

const replaceSim = function(array, index, removeCount, insert) {
    var add = insert ? insert.length : 0,
        length = array.length,
        pos = fixArrayIndex(array, index)

    // we try to use Array.push when we can for efficiency...
    if (pos === length) {
        if (add) {
            array.push.apply(array, insert)
        }
    }
    else {
        /* eslint-disable-next-line vars-on-top */
        var remove = Math.min(removeCount, length - pos),
            tailOldPos = pos + remove,
            tailNewPos = tailOldPos + add - remove,
            tailCount = length - tailOldPos,
            lengthAfterRemove = length - remove,
            i

        if (tailNewPos < tailOldPos) { // case A
            for (i = 0; i < tailCount; ++i) {
                array[tailNewPos + i] = array[tailOldPos + i]
            }
        }
        else if (tailNewPos > tailOldPos) { // case B
            for (i = tailCount; i--;) {
                array[tailNewPos + i] = array[tailOldPos + i]
            }
        } // else, add == remove (nothing to do)

        if (add && pos === lengthAfterRemove) {
            array.length = lengthAfterRemove // truncate array
            array.push.apply(array, insert)
        }
        else {
            array.length = lengthAfterRemove + add // reserves space

            for (i = 0; i < add; ++i) {
                array[pos + i] = insert[i]
            }
        }
    }

    return array
}
const eraseSim = function(array, index, removeCount) {
  return replaceSim(array, index, removeCount)
}

const eraseNative = function(array, index, removeCount) {
    array.splice(index, removeCount)

    return array
}

const replaceNative = function(array, index, removeCount, insert) {
  if (insert && insert.length) {
      // Inserting at index zero with no removing: use unshift
      if (index === 0 && !removeCount) {
          array.unshift.apply(array, insert)
      }
      // Inserting/replacing in middle of array
      else if (index < array.length) {
          array.splice.apply(array, [index, removeCount].concat(insert))
      }
      // Appending to array
      else {
          array.push.apply(array, insert)
      }
  }
  else {
      array.splice(index, removeCount)
  }

  return array
}
const spliceSim = function(array, index, removeCount) {
  var len = arguments.length,
      pos = fixArrayIndex(array, index),
      removed

  if (len < 3) {
      removeCount = array.length - pos
  }

  removed = array.slice(index, fixArrayIndex(array, pos + removeCount))

  if (len < 4) {
      replaceSim(array, pos, removeCount)
  }
  else {
      replaceSim(array, pos, removeCount, slice.call(arguments, 3))
  }

  return removed
}
const spliceNative = function(array) {
  return array.splice.apply(array, slice.call(arguments, 1))
}
/**
 * 从数组中移除项。这在功能上等同于Array的splice方法，但可以解决IE8的splice方法中的bug，并且不会为了返回它们而复制删除的元素(因为它们经常被忽略)
 * @param {Array} array 要替换的数组.
 * @param {Number} index 要操作的数组中的索引.
 * @param {Number} removeCount 索引处要删除的项的数量(可以为0).
 */
export const erase = supportsSplice ? eraseNative : eraseSim
/**
 * 替换数组中的项。这在功能上相当于Array的splice方法，但可以解决IE8的splice方法的bug，而且通常调用起来更方便，因为它接受一个条目数组来插入，而不是使用可变参数列表。
 * @param {Array} array 要替换的数组.
 * @param {Number} index 要操作的数组中的索引.
 * @param {Number} removeCount 索引处要删除的项的数量(可以为0).
 * @return {Array} elements 要在索引处插入的项的数组.
 */
export const replace = supportsSplice ? replaceNative : replaceSim
/**
 * 替换数组中的项。这相当于Array的splice方法，但可以解决IE8的splice方法的bug。除了数组是第一个参数之外，签名与splice方法完全相同。removeCount之后的所有参数都被插入到数组的下标处
 * @param {Array} array 要替换的数组.
 * @param {Number} index 要操作的数组中的索引.
 * @param {Number} removeCount 索引处要删除的项的数量(可以为0).
 * @return {Array} 要添加到数组中的元素。如果不指定任何元素，则splice只是从数组中删除元素
 */
export const splice = supportsSplice ? spliceNative : spliceSim
/**
 * @method
 * 获取给定数组中提供的项的索引，这是对缺失的arrayPrototype的补充。在Internet Explorer中的索引
 * @param {Array} array 要检查的数组.
 * @param {Object} item 要找到的项目.
 * @param {Number} from (Optional) 开始搜索的索引.
 * @return {Number} item在数组中的索引(如果没有找到，则为-1).
 */
export const indexOf = supportsIndexOf
    ? function(array, item, from) {
        // May be called with no array which causes an error.
        return array ? arrayPrototype.indexOf.call(array, item, from) : -1
    }
    : function(array, item, from) {
        var i,
            length = array ? array.length : 0

        for (i = from < 0 ? Math.max(0, length + from) : from || 0; i < length; i++) {
            if (array[i] === item) {
                return i
            }
        }

        return -1
    }
/**
 * 从数组中移除指定的项(如果它存在).
 *
 * @param {Array} array 数组.
 * @param {Object} item 要删除的项目。
 * @return {Array} 传递的数组
 */
export const remove = function(array, item) {
  var index = indexOf(array, item)

  if (index !== -1) {
      erase(array, index, 1)
  }

  return array
}

/**
 * 移除指定索引处的项目
 * @param {Array} array 数组
 * @param {Number} index 要删除的项目的索引
 * @returns {Array} 传递的数组
 */
export function removeAt(array, index) {
  if(!isArray(array)) return array
  var len = array.length
  if (index >= 0 && index < len) {
    array.splice(index, 1)
  }

  return array
}
 /**
* Inserts items in to an array.
*
* @param {Array} array The Array in which to insert.
* @param {Number} index The index in the array at which to operate.
* @param {Array} items The array of items to insert at index.
* @return {Array} The array passed.
*/
export const insert = function(array, index, items) {
 return replace(array, index, 0, items)
}
export default {
  removeAt,
  insert,
  remove,
  replace,
  indexOf,
  splice
}
