
function countSteps(flips) {
    if (flips == "")
        return 0;

    let flips_arr = flips.split(',');

    return flips_arr.length;
}

function availableFlips(curr_arr, a_arr) {
    let rez = [];

    curr_arr.forEach(el => {
        if (curr_arr.includes(-el)) {
            curr_arr[curr_arr.indexOf(el)] = '';
            curr_arr[curr_arr.indexOf(-el)] = '';
        }
    })

    while (curr_arr.includes('')) {
        curr_arr.splice(curr_arr.indexOf(''), 1)
    }

    a_arr.forEach((element) => {
        if (curr_arr.includes(element)) {
            rez.push(-1 * element)
            curr_arr.splice(curr_arr.indexOf(element), 1)
        } else {
            rez.push(element);
        }
    });



    return rez;
}

function sumArr(arr) {
    let rez = 0;
    for (let el of arr) {
        rez += el;
    }

    return rez;
}

function findFlips(start_arr, a_arr, goal) {
    count_op = 0;
    total_op = 0;

    if(start_arr.length > 50 || a_arr.length > 50){
        return [-123456789];
    }

    for(let el of start_arr){
        if(el < 1 || el > 1000){
            return [-123456789];
        }
    }

    for(let el of a_arr){
        if(el < 1 || el > 1000){
            return [-123456789];
        }
    }

    if(goal < 0 || goal > 100000){
        return [-123456789]
    }

    a_arr = [...start_arr, ...a_arr];
    let obj = {};
    if (sumArr(start_arr) == goal) {
        return []
    }
    obj[sumArr(start_arr)] = start_arr.join(',')

    let index = 0;
    let all_arr = [start_arr];
    
    while (all_arr[index].length <= a_arr.length + start_arr.length) {

        let flips = availableFlips([...all_arr[index]], a_arr);
        
        
        for (let flip of flips) {
            total_op++;
            let curr_arr = [...all_arr[index]];
            curr_arr.push(flip);

            let sum = sumArr(curr_arr);

            if (sum == goal) {
                return curr_arr.slice(start_arr.length)
            }
            
            if (!obj[sum]) {
                count_op++;

                obj[sum] = curr_arr.join(',');
                
                all_arr.push(curr_arr);
            }
        }

        index++;

        if(!all_arr[index]){
            break;
        }
    }

    return [-123456789]

}

let count_op = 0;
let total_op = 0;

console.log("Minimum steps needed to get to the goal: ",findFlips([2,2,5],[1,10],9))
// console.log("Minimum steps needed to get to the goal: ",findFlips([2,2,5],[1,10],14))
// console.log("Minimum steps needed to get to the goal: ",findFlips([2,2,5],[2,10],3))
// console.log("Minimum steps needed to get to the goal: ",findFlips([1,1,1,1,1,1,1],[1,1,1,1,1,1,1],10))
// console.log("Minimum steps needed to get to the goal: ",findFlips([1, 1, 2, 2, 2, 3, 3, 3, 3],[1, 2, 3, 4, 5, 6, 7],0))
// console.log("Minimum steps needed to get to the goal: ",findFlips([5, 5, 5, 5, 47, 100], [42, 80, 174], 147))

console.log("Number of rows in the object/map : ",count_op)
console.log("Total number of cases : ",total_op)



