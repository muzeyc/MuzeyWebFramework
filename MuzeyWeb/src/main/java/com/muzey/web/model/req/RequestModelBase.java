package com.muzey.web.model.req;

public class RequestModelBase {

    /**
     * 分页偏移量
     */
    public int offset;

    /**
     * 分页显示行数
     */
    public int size;

    public int getOffset() {

        return offset;
    }

    public void setOffset(int offset) {

        this.offset = offset;
    }

    public int getSize() {

        return size;
    }

    public void setSize(int size) {

        this.size = size;
    }

}
