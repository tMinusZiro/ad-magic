
class LegendItem {
  constructor(title, color, isFor, textColor, bottomLeft, bottomRight) {
    this.title = title;
    this.color = color;
    this.isFor = isFor;
    this.textColor = textColor != null ? textColor : "black";
    this.borderBottomLeftRadius = bottomLeft != null ? bottomLeft : "0"; 
    this.borderBottomRightRadius = bottomRight != null ? bottomRight : "0"; 
  }
}

export default LegendItem;
