let puppyImages = [
    chrome.runtime.getURL("puppies/1.png"),
    chrome.runtime.getURL("puppies/2.png"),
    chrome.runtime.getURL("puppies/4.png"),
    chrome.runtime.getURL("puppies/5.png")    
  ];
  
  document.addEventListener("keydown", (e) => {
    // Trigger: Shift + Cmd + P (on Mac)
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "p") {
      rainPuppies();
    }
  });
  
  function rainPuppies() {
    for (let i = 0; i < 5; i++) {  // fewer puppies
      let puppy = document.createElement("img");
      puppy.src = puppyImages[Math.floor(Math.random() * puppyImages.length)];
      puppy.className = "puppy-rain";
      puppy.style.left = Math.random() * 100 + "vw";
      puppy.style.width = "100px";  // bigger puppies
      puppy.style.height = "auto";  // keep aspect ratio
      puppy.style.animationDuration = (Math.random() * 3 + 3) + "s";
      document.body.appendChild(puppy);
  
      setTimeout(() => puppy.remove(), 5000);
    }
  }
  