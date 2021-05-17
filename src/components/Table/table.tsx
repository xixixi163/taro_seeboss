import React, { useState, useEffect, useRef, ReactNode } from "react";
import {
  ScrollView,
  View,
  Checkbox,
  CheckboxGroup,
  Button
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import {
  TableProps,
  TableHeader,
  TableRow,
  DragStyleType,
  StartPType,
  upDragStyleType
} from "./types";
import "./index.less";
import { AtActivityIndicator } from "taro-ui";

const Table = <T extends object>(
  props: TableProps<T> & { children?: ReactNode }
): JSX.Element => {
  // 下拉框的样式
  const {
    headers,
    tableData,
    stripe,
    msg,
    border,
    tdWidth,
    width,
    height,
    loading,
    loadMore,
    onAddButtonClick,
    onDeleteButtonClick,
    showToolBar,
    onCheck,
    onCheckAll
  } = props;

  const [scrollWidth, setScrollWidth] = useState<number | string>("100%");
  // const [tableData, settableData] = useState<(T & TableRow)[]>(data);

  const isAll = useRef(false);

  // 下拉框的样式
  const [upDragStyle, setUpDragStyle] = useState<upDragStyleType>({
    height: 0 + "px"
  });
  //上拉图标样式;
  const [pullText, setPullText] = useState("点击加载更多...");
  // 位置
  const startP = useRef<StartPType>({ clientX: 0, clientY: 0 });
  // 0 不作操作 1 刷新 -1 加载更多
  const dragState = useRef(0);
  // 是否滚动
  const scrollY = useRef(true);

  useEffect(() => {
    const reducer = function reducer(
      accumulator: number,
      currentValue: TableHeader
    ) {
      return accumulator + currentValue.width!;
    };

    const scrollWidth = headers.reduce(reducer, 0);
    setScrollWidth(scrollWidth);
  }, [headers]);

  const handleCheckAllChange = () => {
    isAll.current = !isAll.current;
    if (onCheckAll) {
      onCheckAll(isAll.current);
    }
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

  const loadClick = () => {
    pull();
  };

  // 还原初始设置
  const reduction = () => {
    const time = 0.5;
    scrollY.current = true;
    dragState.current = 0;
    setUpDragStyle({
      height: 0 + "px",
      tansition: `all ${time}s`
    });
    setTimeout(() => {
      // setDragStyle({
      //   marginTop: 0 + "px"
      // });
      setUpDragStyle({
        height: 0 + "px"
      });
      // pullText.current = "上拉加载更多";
    }, time * 1000);
  };
  // 屏幕上滑动时触发
  const touchMove = (e: any) => {
    console.log(e);
    // 移动时的位置；
    // 左右偏移量（超过这个偏移量不执行下拉操作）
    // 拉动长度（低于这个值的时候不执行）
    // 拉动的最大高度
    let move_p = e.touches[0],
      deviationX = 0.3,
      deviationY = 30,
      maxY = 70;
    let start_x = startP.current.clientX,
      start_y = startP.current.clientY,
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
          dragState.current = -1;
          setUpDragStyle({
            height: pY + 30 + "px"
          });
          // pullText.current = "加载中";
        } else {
          dragState.current = -1;
          // pullText.current = "上拉加载更多";
        }
        if (pY >= maxY) {
          pY = maxY;
        }
        // setDragStyle({ marginTop: -pY + "px" });
        setUpDragStyle({
          height: pY + 30 + "px"
        });
        // 拖动的时候禁用滚动
        scrollY.current = false;
      }
    }
  };
  const pull = () => {
    console.log("loading");
    setPullText("加载中...");
    // setTimeout(() => {
    if (loadMore) {
      loadMore();
    }
    setPullText("点击加载更多...");
    // }, 1000);
  };

  const touchEnd = (e: any) => {
    console.log(e);
    if (dragState.current === -1) {
      pull();
      // loadMore();
    }
    reduction();
  };
  const touchStart = (e: any) => {
    // console.log(e);
    startP.current = e.touches[0];
    console.log(startP);
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
        {showToolBar && (
          <View className="button-group">
            <Button
              className="btn btn-primary"
              onClick={() => {
                if (onDeleteButtonClick) {
                  onDeleteButtonClick(tableData.filter(item => item.isCheck));
                }
              }}
            >
              清空商品
            </Button>
            <Button className="btn btn-secondary" onClick={onAddButtonClick}>
              新增商品
            </Button>
          </View>
        )}
        <ScrollView scrollX={true} style={{ width: "100%" }} className="table">
          <View
            className={`thead ${border ? "thead-border" : ""}`}
            style={{ width: `${scrollWidth}rpx` }}
          >
            <Column width="150">
              <CheckboxGroup onChange={handleCheckAllChange}>
                <Checkbox value="全选" checked={isAll.current}></Checkbox>
              </CheckboxGroup>
            </Column>
            {headers.map((header, index) => (
              <Column key={header.prop} width={header.width}>
                {header.label}
              </Column>
            ))}
          </View>

          <ScrollView
            scrollY={scrollY.current}
            className="tbody"
            style={{
              width: `${scrollWidth}rpx`,
              height: height ? height : "auto"
            }}
            // onTouchMove={touchMove}
            // onTouchEnd={touchEnd}
            // onTouchStart={touchStart}
            // onScrollToLower={scrollToLower}
            // onScrollToUpper={scrollToUpper}
            scrollWithAnimation
          >
            <CheckboxGroup>
              {tableData.length > 0 ? (
                tableData.map((item, i) => (
                  <Row>
                    <Column width={150}>
                      <Checkbox
                        value={"" + item.id}
                        checked={item.isCheck || false}
                        onClick={() => {
                          if (onCheck) {
                            onCheck(item);
                          }
                        }}
                      ></Checkbox>
                    </Column>
                    {headers.map((header, index) => (
                      <Column width={header.width} key={item.id}>
                        {header.render
                          ? header.render(item)
                          : item[header["prop"]]}
                      </Column>
                    ))}
                  </Row>
                ))
              ) : (
                <View className="undata-wrap">
                  {loading && (
                    <View className="loading-wrap">
                      <AtActivityIndicator className="loading"></AtActivityIndicator>
                    </View>
                  )}
                  <View className="no-data">{msg || `暂无数据`}</View>
                </View>
              )}
            </CheckboxGroup>
          </ScrollView>
        </ScrollView>
      </View>
      {tableData.length > 0 && (
        <View className="dragBox" onClick={() => loadClick()}>
          {pullText === "加载中..." && (
            <AtActivityIndicator></AtActivityIndicator>
          )}
          <View className="downText">{pullText}</View>
        </View>
      )}
    </>
  );
};

export default Table;
