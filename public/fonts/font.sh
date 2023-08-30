# public/fonts内にある全ての.otfファイルをまとめる

ls *.otf | while read line; do
  font_variant=$(echo $line | sed -e 's/.*-//g' | sed -e 's/.otf//g')
  font_name=$(echo $line | sed -e 's/-.*//g')
  # もしfont_variantにItalicが含まれていたらfont_styleにitalicを代入、それ以外はnormalを代入
  if [[ $font_variant =~ "Italic" ]]; then
    font_style="italic"
  else
    font_style="normal"
  fi
  # もしfont_variantにフォントの太さに関する文字列が含まれていたらfont_weightそれに対応する数字に代入、それ以外はnormalを代入
  # e.g. font_variant: "Bold" -> font_weight: 700
  if [[ $font_variant =~ "Black" ]]; then
    font_weight="900"
  elif [[ $font_variant =~ "Heavy" ]]; then
    font_weight="800"
  elif [[ $font_variant =~ "Bold" ]]; then
    font_weight="700"
  elif [[ $font_variant =~ "Semibold" ]]; then
    font_weight="600"
  elif [[ $font_variant =~ "Medium" ]]; then
    font_weight="500"
  elif [[ $font_variant =~ "Regular" ]]; then
    font_weight="400"
  else
    font_weight="error"
  fi

  echo "@font-face {
    font-family: '$font_name';
    font-style: $font_style;
    font-weight: $font_weight;
    src: url('fonts/$line');
  }\n" >>NewYork.css
done
