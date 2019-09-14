namespace motion {
    /**
     * Init moiton sensors
     */
    //% shim=motion::init
    function init(): boolean { return true };

    /**
     * Read rotation
     */
    //% shim=motion::rotation
    function rotation(axis: int32): number { return 0 };
}
