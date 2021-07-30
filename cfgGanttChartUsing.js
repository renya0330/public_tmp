var TableName = ""; //テーブル名
var NameArray = ["通信切断","アラーム時間","停止時間","非稼働時間","稼働時間"]; //項目名配列
$(function(){ //jQueryでスピナー実装
  $('#sortdata').sortable();
  $('#sortdata').bind('sortstop',function(){ // sortstopイベントをバインド
    $(this).find('[name="num_data"]').each(function(idx){ // 番号を設定している要素に対しループ処理
      $(this).html(idx+1); // タグ内に通し番号を設定（idxは0始まりなので+1する）
    });
  });
});
SetTableList(); //データから並びを逆算して作成する
function TopbtnClick(){ //ダッシュボードへ遷移する関数
  var locate = getTag("app.homepage")  //ホームページのあるディレクトリ文字列の取得
  var jumpLocate = "screen/AllEquipmentMonitoring.svg" //遷移するURL文字列の宣言
  var jumpURL = locate + "index.html#" + jumpLocate //遷移するURL文字列の作成
  window.top.location.href=jumpURL //遷移の実行
}
function changebtnClick(){ //稼働時間ガントチャート表示へ遷移する関数
  var locate = getTag("app.homepage")  //ホームページのあるディレクトリ文字列の取得
  var jumpLocate = "GanttChartUsing.html" //遷移するURL文字列の宣言
  var jumpURL = locate + "index.html#" + jumpLocate //遷移するURL文字列の作成
  window.top.location.href=jumpURL //遷移の実行
}
function AllchangebtnClick(){ //稼働時間一覧ガントチャート表示へ遷移する関数
  var locate = getTag("app.homepage")  //ホームページのあるディレクトリ文字列の取得
  var jumpLocate = "AllGanttChartUsing.html" //遷移するURL文字列の宣言
  var jumpURL = locate + "index.html#" + jumpLocate //遷移するURL文字列の作成
  window.top.location.href=jumpURL //遷移の実行
}
function ZeroDigitsString(n, digits){ //0詰めする関数, n:変換する数, digits:表示桁数
  var d = -1*digits //桁数正規化
  var nstr = ( '00000000000000000' + n ).slice( d ) //設備番号文字列作成
  return nstr
}
function UpdatebtnClick(){ //パラメータを反映する関数
  var table_element = document.getElementById('content-table'); //table要素の取得
  var PriorityArray = []; //優先度配列
  for (var i=1; i<5+1; i++){ //項目名配列の要素数5でループ
    var JSON_array = [
      +(table_element.rows[i].cells[0].innerText),
      +(table_element.rows[i].cells[2].innerText)
    ]
    PriorityArray.push(JSON_array)
  }
  PriorityConfig(PriorityArray); //優先度の設定を実行する関数
}
function PriorityConfig(PriorityArray){ //優先度の設定を実行する関数
  for (var i in PriorityArray){
    setTag("EqGStatePriorityConfig_" + ZeroDigitsString(PriorityArray[i][0], 3), PriorityArray[i][1]);
  }
  alert("設定が完了しました") //通知を出す
}
function SetTableList(){ //データから並びを逆算して作成する関数
  var table_element = document.getElementById('content-table'); //table要素の取得
  for (var i=1; i<5+1; i++){ //項目名配列の要素数5でループ
    var StateID = +getTag("EqGStatePriorityConfig_" + ZeroDigitsString(i, 3)) //状態IDの取得
    table_element.rows[i].cells[1].innerText = NameArray[StateID-1] //状態名の反映
    table_element.rows[i].cells[2].innerText = StateID //状態IDの反映
  }
}
function rstbtnClick(){ //並びを標準にかえる
  var table_element = document.getElementById('content-table'); //table要素の取得
  for (var i=1; i<5+1; i++){ //項目名配列の要素数5でループ
    table_element.rows[i].cells[1].innerText = NameArray[i-1] //状態名の反映
    table_element.rows[i].cells[2].innerText = i //状態IDの反映
  }
}
