export default function OrderMin({minimumTotal, setTotal}){
    return (
        <div className="m-3 flex flex-row">
            <label>Minimum Total: </label>
            <input 
                className="mx-2 px-1 w-[100px] rounded-md"
                type="number" 
                min={0}
                value={minimumTotal}
                onChange={(e) => {
                    if(e.target.value >= 0){
                        setTotal(e.target.value)
                    }else{
                        setTotal("");
                    }
                }}
            />
        </div>
    )
}