//Module export
export default function Header(){
    return (
        //Instructions for how to interact with the UI
        <div>
            <div className="text-center">
                <h1 className="text-[20px]">Report generation</h1>
            </div>
            <div className="m-3">
                <p>Choose the filters to generate the report with.</p>
                <p>Will return all data if no filters are chosen: </p>
            </div>
        </div>
    )
}