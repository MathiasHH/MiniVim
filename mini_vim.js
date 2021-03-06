/*Copyright 2020 Mathias Hedemann Hansen

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


// for debugging if the plugin is connected
// document.body.style.border = "5px solid red"
//
function scrollDown(amount) { window.scrollByLines(amount); }

function scrollUp(amount) { window.scrollByLines(-amount); }

function scrollRight(amount) { window.scrollRight(amount) }

function scrollLeft(amount) { window.scrollLeft(amount) }

function scrollToTop() { window.scrollTo(window.scrollX, 0); }

function scrollToBottom() { window.scrollTo(window.scrollX, document.body.scrollHeight); }

let gRepeat, dRepeat, hRepeat, lRepeat, tRepeat, sRepeat, xRepeat
function doIfKey(e) {

  function hitTwice(repeat, fn){
    // if it is not first time we type key 
    if (repeat !== undefined) {  
      // calculate time between each key hit
      const now = new Date()
      const timeDiffMs = now - repeat
      const secs_since_last_key_hit = timeDiffMs / 1000

      // we use repeat to check if key has been hit twice
      // to be able to do so it must be undefined after it has been hit 
      // twice
      repeat = undefined 

      // if we have hit key twice within a half a second we call callback
      if (secs_since_last_key_hit < 0.5) fn()
    }
    return repeat = new Date()
  }
  // console.log(e.code);
  // console.log(e.keyCode);
  // console.log(e.ctrlKey);

  if (e.code === "KeyJ") return scrollDown(10) 
  if (e.code === "KeyK") return scrollUp(10)
  if (e.code === "KeyF") return scrollDown(50)
  if (e.code === "KeyB") return scrollUp(50)
  if (e.shiftKey && e.code === "KeyG") return scrollToBottom()
  if (e.code === "KeyG") {
    gRepeat = hitTwice(gRepeat, function() {
      scrollToTop()
    })
    return gRepeat
  }
  if (e.shiftKey && e.code === "KeyH") {
    hRepeat = hitTwice(hRepeat, function() {
      window.history.back()
    })
    return hRepeat
  }
  if (e.shiftKey && e.code === "KeyL") {
    lRepeat = hitTwice(lRepeat, function() {
      window.history.forward()
    })
    return lRepeat
  }
  // we can only close window we have opened ourselfs
  if (e.shiftKey && e.code === "KeyD") {
    dRepeat = hitTwice(dRepeat, function() {
      window.close()
    })
    return dRepeat
  }
  if (e.shiftKey && e.code === "KeyT") {
    tRepeat = hitTwice(tRepeat, function() {
      return window.open()
      // the user could then do ctrl + l to be able to write in the addressbar
    })
    return tRepeat
  }
  // if (e.ctrlKey && e.shiftKey && e.code === "KeyT") {
    // return window.open()
    // the user could then do ctrl + l to be able to write in the addressbar
  // }
  if (e.shiftKey && e.code === "KeyS") {
    sRepeat = hitTwice(sRepeat, function() {
      window.open("https://duckduckgo.com")
    })
    return sRepeat
  }
  if (e.shiftKey && e.code === "KeyX") {
    xRepeat = hitTwice(xRepeat, function() {
      window.open("https://google.com")
    })
    return xRepeat
  }

  // TODO window.find() or just use Firefix quickfind / 
  // TODO open what window.find() found or just use enter after quick found
}
document.addEventListener('keydown', doIfKey);
