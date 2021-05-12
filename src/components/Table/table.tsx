import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Checkbox,
  CheckboxGroup,
  Button
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import { TableProps, TableHeader, TableRow } from "./types";
import "./index.less";
import { AtActivityIndicator } from "taro-ui";

const Loading = () => {
  return <View className="loading"></View>;
};
type StartPType = {
  clientX?: number;
  clientY?: number;
};
type DragStyleType = {
  marginTop?: string;
  bottom?: string;
  transition?: string;
};
type upDragStyleType = {
  height?: string;
  tansition?: string;
};
const Table: React.FC<TableProps> = props => {
  // 下拉框的样式
  const [dragStyle, setDragStyle] = useState<DragStyleType>({
    marginTop: 0 + "px"
  });

  const [upDragStyle, setUpDragStyle] = useState<upDragStyleType>({
    height: 0 + "px"
  });
  //上拉图标样式;
  const [pullText, setPullText] = useState("上拉加载更多");
  const [startP, setStartP] = useState<StartPType>({});
  // 0 不作操作 1 刷新 -1 加载更多
  const [dragState, setDragState] = useState(0);
  // 是否滚动
  const [scrollY, setScrollY] = useState(true);

  const {
    headers,
    data,
    stripe,
    msg,
    border,
    tdWidth,
    width,
    height,
    loading
  } = props;
  const [scrollWidth, setScrollWidth] = useState("100%");
  const [tableItem, setTableItem] = useState<TableRow[]>(data);
  const [isAll, setIsAll] = useState(false);

  useEffect(() => {
    setTableItem(data);
  }, [data]);
  useEffect(() => {
    const reducer = function reducer(accumulator, currentValue: TableHeader) {
      return accumulator + currentValue.width;
    };

    const scrollWidth = headers.reduce(reducer, 0);
    setScrollWidth(scrollWidth);
  }, [headers]);

  useEffect(() => {
    if (isAll) {
      setTableItem(
        tableItem.map(item => ({
          ...item,
          isCheck: true
        }))
      );
    } else {
      setTableItem(
        tableItem.map(item => ({
          ...item,
          isCheck: false
        }))
      );
    }
  }, [isAll]);

  const checkAll = () => {
    setIsAll(!isAll);
  };

  const Row: React.FC<{
    stripe?: boolean;
    border?: boolean;
  }> = ({ children, stripe, border }) => (
    <View
      className={`tbody-tr ${stripe ? "tbody-tr-stripe" : ""} ${
        border ? "tbody-tr-border" : ""
      }`}
    >
      {children}
    </View>
  );

  const Column: React.FC<{
    width?: string | number;
  }> = ({ children, width }) => (
    <View
      className="td"
      style={{
        width: width ? width + "rpx" : ""
      }}
    >
      {children}
    </View>
  );

  // 还原初始设置
  const reduction = () => {
    const time = 0.5;
    setUpDragStyle({
      height: 0 + "px",
      tansition: `all ${time}s`
    });
    setDragState(0);
    // setDownDragStyle({
    //   height: 0 + "px",
    //   tansition: `all ${time}s`
    // });
    setDragStyle({
      marginTop: 0 + "px",
      transition: `all ${time}s`
    });
    setTimeout(() => {
      setDragStyle({
        marginTop: 0 + "px"
      });
      setUpDragStyle({
        height: 0 + "px"
      });
      setPullText("上拉加载更多");
      // setDownText("下拉刷新");
    }, time * 1000);
  };
  // 屏幕上滑动时触发
  const touchMove = e => {
    // console.log(e);
    // 移动时的位置；
    // 左右偏移量（超过这个偏移量不执行下拉操作）
    // 拉动长度（低于这个值的时候不执行）
    // 拉动的最大高度
    let move_p = e.touches[0],
      deviationX = 0.3,
      deviationY = 10,
      maxY = 15;
    let start_x = startP.clientX,
      start_y = startP.clientY,
      move_x = move_p.clientX,
      move_y = move_p.clientY;

    // 得到偏移数值
    let dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y);
    // 当偏移数值大于设置的偏移数值时则不执行操作
    if (dev < deviationX) {
      // 拖动倍率（使拖动的时候有黏滞的效果）
      let pY = Math.abs(move_y - start_y) / 3.5;
      // if (move_y - start_y > 0) {
      //   if (pY >= deviationY) {
      //     setDownDragStyle({
      //       height: 50 + "px"
      //     });
      //     setDragState(1);
      //     setDownText("释放刷新");
      //   } else {
      //     setDragState(0);
      //     setDownText("下拉刷新");
      //   }
      //   if (pY >= maxY) {
      //     pY = maxY;
      //   }
      //   setDragStyle({ top: pY + 50 + "px" });
      //   setDownDragStyle({
      //     height: pY + "px"
      //   });
      //   // 拖动的时候禁用滚动
      //   setScrollY(false);
      // }
      if (start_y - move_y > 0) {
        //上拉操作
        console.log("上拉操作");
        if (pY >= deviationY) {
          setDragState(-1);
          setUpDragStyle({
            height: pY + 20 + "px"
          });
          setPullText("释放加载更多");
        } else {
          setDragState(-1);
          setPullText("上拉加载更多");
        }
        if (pY >= maxY) {
          pY = maxY;
        }
        setDragStyle({ marginTop: -pY + "px" });
        setUpDragStyle({
          height: pY + 20 + "px"
        });
        // 拖动的时候禁用滚动
        setScrollY(false);
      }
    }
  };
  const pull = () => {
    console.log("上拉");
  };

  const touchEnd = e => {
    // console.log(e);
    if (dragState === -1) {
      pull();
    }
    reduction();
  };
  const touchStart = e => {
    // console.log(e);
    setStartP(e.touches[0]);
  };
  const scrollToUpper = () => {
    console.log("to upper");
  };
  const scrollToLower = () => {
    console.log("to lower");
  };

  return (
    <>
      <View className="table">
        <View className="button-group">
          <Button className="btn btn-primary">清空商品</Button>
          <Button
            className="btn btn-secondary"
            onClick={() =>
              Taro.navigateTo({
                url: "/pages/form/index"
              })
            }
          >
            新增商品
          </Button>
        </View>
        <ScrollView scrollX={true} style={{ width: "100%" }} className="table">
          <View
            className={`thead ${border ? "thead-border" : ""}`}
            style={{
              width: `${scrollWidth}rpx`
            }}
          >
            <Column width="150">
              <CheckboxGroup onChange={checkAll}>
                <Checkbox value="全选" checked={isAll}></Checkbox>
              </CheckboxGroup>
            </Column>
            {headers.map((header, index) => (
              <Column key={header.prop} width={header.width}>
                {header.label}
              </Column>
            ))}
          </View>
          <ScrollView
            scrollY={scrollY}
            className="tbody"
            style={{
              width: `${scrollWidth}rpx`,
              height: height ? height : "auto",
              marginTop: dragStyle.marginTop,
              transition: dragStyle.transition
            }}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
            onTouchStart={touchStart}
            onScrollToLower={scrollToLower}
            onScrollToUpper={scrollToUpper}
            scrollWithAnimation
          >
            <CheckboxGroup>
              {tableItem.length > 0 ? (
                tableItem.map((item, i) => (
                  <Row>
                    <Column width={150}>
                      <Checkbox
                        value={"" + item.id}
                        checked={item.isCheck || false}
                      ></Checkbox>
                    </Column>
                    {headers.map((header, index) => (
                      <Column width={header.width} key={item.id}>
                        {header.render ? header.render() : item[header["prop"]]}
                      </Column>
                    ))}
                  </Row>
                ))
              ) : (
                <View className="undata-wrap">
                  {loading && (
                    <View className="loading-wrap">
                      <Loading></Loading>
                    </View>
                  )}
                  <View className="no-data">{msg || `暂无数据`}</View>
                </View>
              )}
            </CheckboxGroup>
          </ScrollView>
        </ScrollView>
      </View>
      {tableItem.length > 0 && (
        <View className="dragBox up" style={upDragStyle}>
          <AtActivityIndicator></AtActivityIndicator>
          <View className="downText">{pullText}</View>
        </View>
      )}
    </>
  );
};

export default Table;
