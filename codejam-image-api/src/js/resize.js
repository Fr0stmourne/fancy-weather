
export default function resize(frame, given) {
  const ratio = given.width / given.height;

  const resultWidth = ((frame.width / ratio) < frame.height)
    ? frame.width
    : frame.height * ratio;

  const resultHeight = ((frame.width / ratio) < frame.height)
    ? frame.width / ratio
    : frame.height;

  return {
    width: resultWidth,
    height: resultHeight,
  };
}
