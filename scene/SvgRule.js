pv.SvgScene.rule = function(scenes) {
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];

    /* visible */
    if (!s.visible) continue;

    /* stroke */
    var stroke = pv.color(s.strokeStyle);
    if (!stroke.opacity) continue;

    var line = this.create("line");
    line.setAttribute("cursor", s.cursor);
    line.setAttribute("x1", s.left);
    line.setAttribute("y1", s.top);
    line.setAttribute("x2", s.left + s.width);
    line.setAttribute("y2", s.top + s.height);
    line.setAttribute("stroke", stroke.color);
    line.setAttribute("stroke-opacity", stroke.opacity);
    line.setAttribute("stroke-width", s.lineWidth);
    scenes.parent.scene.g.appendChild(this.title(line, s));
  }
};
