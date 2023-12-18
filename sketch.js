var grid = 20;
var p1select;
var p2select;
var but;
let size_x = 1200;
let size_y = 800;
let offset_x = 40;
let offset_y = 40;
let gridOffset = grid / 2;
let mx = 0;
let my = 0;
let mpx = 0;
let mpy = 0;
let pArr = [];
let changed = false;
let von = "  von ";
let nach = " nach ";
let pcount = 0;

function drawGrid() {
  // Draw grid
  gridOffset=1
  var l = 0;
  strokeWeight(1);
  stroke(230);
  while (l < width || l < height) {
    line(0, l, width, l);
    line(l, 0, l, height);
    l += grid;
  }
}

function findP(p) {
  let arr = []
  pArr.forEach(findp);
  function findp(value,index,array) {
    if (value[6] == p) arr = [value[2],value[3]];
    if (value[7] == p) arr = [value[0],value[1]];
  }
  return arr;
}

function von_selection(von) {
  p1select = createSelect()
  p1select.position(size_x + offset_x + 50,offset_y);
  p1select.option("  von ")
  pArr.forEach(make_options);
  function make_options(value,index,array) {
    if (pArr.length>(index)) p1select.option("  P" + (index + 1).toString());
  }
  p1select.selected(von)
}

function nach_selection() {
  p2select = createSelect()
  p2select.position(size_x + offset_x + 120,offset_y);
  p2select.option(" nach ");
  let vonx = Number(von.substring(3));
  if (vonx >= 0) {
    for (let i = 1; i <= pcount; i++) {
      if (vonx != i) p2select.option("  P" + i.toString());
    }
  }
  if (pArr.length > 0) {
    left = false;
    right = false;
    up = false;
    down = false;
    let arr = findP(vonx);
    if (arr != []) {
      x = arr[0];
      y = arr[1];
      pArr.forEach(get_points);
      function get_points(value,index,array) {
        if (value[0] > x && value[2] > x && value[1] < y && value[3] > y) right = true;
        if (value[0] > x && value[2] > x && value[1] > y && value[3] < y) right = true;
        if (value[0] < x && value[2] < x && value[1] < y && value[3] > y) left = true;
        if (value[0] < x && value[2] < x && value[1] > y && value[3] < y) left = true;
        if (value[1] > y && value[3] > y && value[0] < x && value[2] > x) down = true;
        if (value[1] > y && value[3] > y && value[0] > x && value[2] < x) down = true;
        if (value[1] < y && value[3] < y && value[0] < x && value[2] > x) up = true;
        if (value[1] < y && value[3] < y && value[0] > x && value[2] < x) up = true;
      }
      if (left) p2select.option("  <-");
      if (right) p2select.option("  ->");
      if (up) p2select.option("  ^");
      if (down) p2select.option("  v");
    }
  }
}

function setup() {
  let canv = createCanvas(size_x, size_y);
  von_selection();
  nach_selection();
  canv.position(offset_x, offset_y);
  background(255);
  drawGrid();
}

function draw() {
  if (mouseIsPressed) {
    var x = snap(mouseX);
    var y = snap(mouseY);
    var px = snap(pmouseX);
    var py = snap(pmouseY);
    changed = false;
    if (px <= (size_x + offset_x) && py <= (size_y + offset_y)) {
      if (px != mpx || py != mpy) { 
        drawShape();
      }
      if (mx == 0) mx = x;
      if (my == 0) my = y;
      mpx = px;
      mpy = py;
      strokeWeight(2);
      stroke(200);
      line(mpx, mpy, mx, my);
      changed = true;
    }
  }
  if (p1select.selected() != von) {
    von = p1select.selected();
    nach_selection(0);
  }
  if (p2select.selected() != nach) {
    nach = p2select.selected();
    inp = createInput("0.0 cm");
    inp.position(size_x + offset_x + 190,offset_y);
    inp.size(70);
    but_ok = createButton("OK");
    but_ok.position(size_x + offset_x + 290,offset_y);
    but_del = createButton(" - ");
    but_del.position(size_x + offset_x + 350,offset_y);
    but_add = createButton(" + ");
    but_add.position(size_x + offset_x + 390,offset_y);
  }
}

function snap(op) {
  // subtract offset (to center lines)
  // divide by grid to get row/column
  // round to snap to the closest one
  var cell = Math.round((op - gridOffset) / grid);
  // multiply back to grid scale
  // add offset to center
  return cell * grid + gridOffset;
}

function drawShape() {
  clear();
  drawGrid();
  pArr.forEach(drawLine);
  function drawLine(value, index, array) {
    strokeWeight(1);
    stroke(value[4]);
    line(value[0], value[1], value[2], value[3]);
    stroke(value[5]);
    text("P" + value[7].toString(),value[0],value[1]);
    text("P" + value[6].toString(),value[2],value[3]);
  }
}

function findPoint(x, y) {
  val = 0
  pArr.forEach(findPt);
  function findPt(value, index, array) {
    if (value[0] == x && value[1] == y) val=value[7];
    if (value[2] == x && value[3] == y) val=value[6];
  }
  return val;
}

function mouseReleased() {
  if (changed) {
    let cntx = 0;
    let cnty = 0;
    drawGrid();
    let val = findPoint(mx,my);
    if (val > 0) cntm = val; else {
      pcount = pcount +1;
      cntm = pcount;
    }
    val = findPoint(mpx,mpy);
    if (val > 0) cntmp = val; else {
      pcount = pcount +1;
      cntmp = pcount;
    }
    pArr.push([mpx,mpy,mx,my,"blue","gray",cntm,cntmp]);
    print(pArr.length-1,"mpx:",mpx,"mpy:",mpy,"mx:",mx,"my:",my,"cp:","blue","cl:","gray","p-:",cntm,"p+:",cntmp);
    mx = 0;
    my = 0;
    drawShape();
    von_selection(von);
  }
}
