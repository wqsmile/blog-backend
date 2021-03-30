function LCS(str1, str2) {
  var table = [];

  function _LCS(str1, str2) {
    //判断目前的输入值是否有对应的计算结果（是不是已经存过了）
    for (var i = 0; i < table.length; i++) {
      if (table[i].str1 === str1 && table[i].str2 === str2) {
        return table[i].result;
      }
    }
    //没有存储结果
    var newResult; //用于计算最终计算的结果
    if (!str1 || !str2) newResult = "";// 其中有一个字符串没东西
    else if (str1[0] === str2[0]) {
      //开头相同
      newResult = str1[0] + _LCS(str1.substr(1), str2.substr(1));
    }
    else {
      var s1 = _LCS(str1, str2.substr(1));
      var s2 = _LCS(str1.substr(1), str2);
      if (s1.length < s2.length) {
        newResult = s2;
      }
      else {
        newResult = s1;
      }
    }
    table.push({
      str1: str1,
      str2: str2,
      result: newResult
    })
    return newResult;
  }

  var result = _LCS(str1, str2);
  console.log(table)
  return result;

}

// LCS('吴文全', '无所谓吴长度是否是文全')