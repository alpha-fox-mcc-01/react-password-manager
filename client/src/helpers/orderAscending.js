function compareAsc(a, b) {
  if (a.url < b.url) {
    return 1;
  }
  if (a.url > b.url) {
    return -1;
  }
  return 0;
}

export default compareAsc;
