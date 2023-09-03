// Get Elemens
const container = document.querySelector(".section .container");
const filter = document.querySelector(".filter");
const filerLeft = document.querySelector(".filter .left");

gatedata();

// click filter

// Get the data from json
function gatedata() {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let datas = JSON.parse(req.responseText);
      // To Se The Data
      // console.log(datas);

      datas.forEach((data) => {
        setTheEle(data);
        const ctgs = document.querySelectorAll(".job ul > .ctg");
        const jobs = document.querySelectorAll(".job");
        let chosingCtg = [];
        ctgs.forEach((ctg) => {
          ctg.onclick = function () {
            setFilterBar(ctg, chosingCtg);
            filtering(jobs, chosingCtg);
            controlTagFilterBox(jobs, chosingCtg);
          };
        });
      });
    }
  };

  // req.open("GET", "../data.json");
  req.open("GET", "https://styrexx.github.io/static-job-listings/data.json");
  req.send();
}

/**
 *
 * chosingCtg the array of chosing tage
 *
 */

function filtering(jobs, chosingCtg) {
  jobs.forEach((job) => {
    let jobValue = Object.values(job.dataset).join(" ").split(" ");

    job.classList.add("d-none");
    let conter = 0;
    chosingCtg.forEach((ctg) => {
      jobValue.forEach((val) => {
        if (ctg === val) {
          conter++;
        }
      });
    });
    if (conter === chosingCtg.length) {
      job.classList.remove("d-none");
    }
  });
  if (chosingCtg.length === 0) {
    jobs.forEach((job) => job.classList.remove("d-none"));
    filerLeft.innerHTML = "";
    filter.classList.remove("active");
  }
}

function controlTagFilterBox(jobs, chosingCtg) {
  let tageFilter = Object.values(filerLeft.children);
  const filterRight = document.querySelector(".filter .right");
  tageFilter.forEach((tage) => {
    tage.addEventListener("click", (e) => {
      e.target.remove();
      chosingCtg.splice(chosingCtg.indexOf(e.target.innerHTML), 1);
      filtering(jobs, chosingCtg);
    });
  });

  filterRight.addEventListener("click", () => {
    jobs.forEach((job) => job.classList.remove("d-none"));
    filerLeft.innerHTML = "";
    filter.classList.remove("active");
    chosingCtg.splice(0, chosingCtg.length);
    filtering(jobs, chosingCtg);
  });
}

function setFilterBar(ctg, chosingCtg) {
  filter.classList.add("active");
  filerLeft.innerHTML = "";
  chosingCtg.includes(ctg.innerHTML) ? false : chosingCtg.push(ctg.innerHTML);
  chosingCtg.forEach((val) => {
    let eleBox = creatEle("div");
    eleBox.innerHTML = val;
    filerLeft.appendChild(eleBox);
    appendEle(filerLeft, eleBox);
  });
}

function creatEle(theEle, theClasses = "") {
  theName = document.createElement(theEle);
  if (theClasses !== "") {
    theName.classList = theClasses;
  }
  return theName;
}
function appendEle(from, to) {
  from.appendChild(to);
}

function setTheEle(data) {
  let jobBox = creatEle(
    "div",
    "job d-flex justify-content-start justify-content-sm-between flex-wrap p-2 ps-4 pe-4 mt-2 mb-2 gap-2"
  );

  let jobLeft = creatEle(
    "div",
    "d-flex gap-3 align-items-center p-2 flex-wrap"
  );
  // append the jobLeft to jobBox
  appendEle(jobBox, jobLeft);

  let jobLeftImgBox = creatEle("div", "imgJob");
  // append jobLeftImgBox to jobLeft
  appendEle(jobLeft, jobLeftImgBox);

  let jobLeftImg = creatEle("img");
  jobLeftImg.src = data.logo;
  jobLeftImg.alt = data.company.toLowerCase();
  // append jobLeftImg to jobLeftImgBox
  appendEle(jobLeftImgBox, jobLeftImg);

  let jobleftText = creatEle("div", "textJob");
  // append jobleftText to jobLeft
  appendEle(jobLeft, jobleftText);

  let jobleftTextHeader = creatEle(
    "div",
    "textJob-head d-flex gap-2 align-items-center"
  );
  // append jobleftTextHeader to jobleftText
  appendEle(jobleftText, jobleftTextHeader);

  let jobleftTextHeaderName = creatEle("div", "nameJob main-color fw_bold");
  jobleftTextHeaderName.innerHTML = data.company;
  // append jobleftTextHeaderName to jobleftTextHeader
  appendEle(jobleftTextHeader, jobleftTextHeaderName);

  if (data.new === true) {
    let jobleftTextHeaderNew = creatEle(
      "div",
      "new main-bg text-light fw_bold rounded-pill"
    );
    jobleftTextHeaderNew.innerHTML = "New!";
    // append jobleftTextHeaderNew to jobleftTextHeader
    appendEle(jobleftTextHeader, jobleftTextHeaderNew);
  }

  if (data.featured === true) {
    jobBox.classList.add("featborder");
    let jobleftTextHeaderfeat = creatEle(
      "div",
      "feat very-bg-DarkGrayishCyan text-light fw_bold rounded-pill"
    );
    jobleftTextHeaderfeat.innerHTML = "Featured";
    // append jobleftTextHeaderfeat to jobleftTextHeader
    appendEle(jobleftTextHeader, jobleftTextHeaderfeat);
  }

  let jobleftTextTitle = creatEle("h2", "header-title fs-6 fw_bold mt-1 mb-1");
  jobleftTextTitle.innerHTML = data.position;
  // append jobleftTextTitle to jobleftText
  appendEle(jobleftText, jobleftTextTitle);

  let jobleftTextfooter = creatEle(
    "div",
    "textJob-footer d-flex gap-2 text-black-50 fw_normal"
  );
  // append jobleftTextfooter to jobleftText
  appendEle(jobleftText, jobleftTextfooter);

  let jobleftTextfooterPat = creatEle("div");
  jobleftTextfooterPat.innerHTML = data.postedAt;
  // append jobleftTextfooterPat to jobleftTextfooter
  appendEle(jobleftTextfooter, jobleftTextfooterPat);

  let jobleftTextfootercont = creatEle("div");
  jobleftTextfootercont.innerHTML = data.contract;
  // append jobleftTextfootercont to jobleftTextfooter
  appendEle(jobleftTextfooter, jobleftTextfootercont);

  let jobleftTextfooterLoc = creatEle("div");
  jobleftTextfooterLoc.innerHTML = data.location;
  // append jobleftTextfooterLoc to jobleftTextfooter
  appendEle(jobleftTextfooter, jobleftTextfooterLoc);

  let jobright = creatEle(
    "ul",
    "d-flex gap-2 align-items-center p-2 flex-wrap"
  );
  // apped jobright to jobBox
  appendEle(jobBox, jobright);

  let jobrightrole = creatEle("div", "ctg");
  jobrightrole.innerHTML = data.role;
  jobBox.dataset.role = data.role;
  jobrightrole.dataset.role = data.role;
  // append jobrightrole to jobright
  appendEle(jobright, jobrightrole);

  let jobrightlvl = creatEle("div", "ctg");
  jobrightlvl.innerHTML = data.level;
  jobBox.dataset.level = data.level;
  jobrightlvl.dataset.level = data.level;
  // append jobrightlvl to jobright
  appendEle(jobright, jobrightlvl);

  if (data.languages.length > 0) {
    jobBox.dataset.lang = data.languages.join(" ");
  }
  if (data.tools.length > 0) {
    jobBox.dataset.tools = data.tools.join(" ");
  }

  for (let i = 0; i < data.languages.length; i++) {
    let jobrightlangs = creatEle("div", "ctg");
    jobrightlangs.dataset.lang = data.languages[i];
    jobrightlangs.innerHTML = data.languages[i];
    // append jobrightlvl to jobright
    appendEle(jobright, jobrightlangs);
  }
  for (let i = 0; i < data.tools.length; i++) {
    let jobrighttools = creatEle("div", "ctg");
    jobrighttools.dataset.tools = data.tools[i];
    jobrighttools.innerHTML = data.tools[i];
    // append jobrightlvl to jobright
    appendEle(jobright, jobrighttools);
  }

  // append the jobBox to the body
  appendEle(container, jobBox);
}
