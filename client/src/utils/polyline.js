export const liesOnPolyline = (point, vertices) => {
  for (let i = 0; i < vertices.length - 2; i++) {
    if (liesOnSegment(point, vertices[i], vertices[i + 1])) {
      return true;
    }
  }
  return false;
};

const liesOnSegment = (point, start, end) => {
  let dx = end[0] - start[0];
  let t, liesInXDir;
  if (dx === 0) {
    liesInXDir = point[0] === start[0];
  } else {
    t = (point[0] - start[0]) / dx;
    liesInXDir = t >= 0 && t <= 1;
  }

  if (liesInXDir) {
    let dy = end[1] - start[1];
    if (dy === 0) {
      return point[1] === start[1];
    } else {
      t = (point[1] - start[1]) / dy;
      return t >= 0 && t <= 1;
    }
  } else {
    return false;
  }
};

export const getSpeedLimit = (locationCoordinates, roadSections) => {
  let speedLimit = null;
  roadSections?.forEach((section) => {
    let isOnSection = liesOnPolyline(locationCoordinates, section.section);
    if (isOnSection) {
      speedLimit = section.speedLimit;
    }
  });
  return speedLimit;
};
