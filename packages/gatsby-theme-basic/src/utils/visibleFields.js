export default function visibleFields(item) {
  return {
    showDate: item?.includes("date") ? true : false,
    showImage: item?.includes("image") ? true : false,
    showExcerpt: item?.includes("excerpt") ? true : false,
  };
}
