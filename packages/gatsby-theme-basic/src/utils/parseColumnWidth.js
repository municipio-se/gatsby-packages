export default function parseColumnWidth(columnWidth) {
  let [, colSpan] = String(columnWidth).match(/^grid.*?(\d+)$/) || [];
  return Number(colSpan) || undefined;
}
