'use strict';

function generateName (length) {
    let words = ['Blue', 'Red', 'Lotus', 'Sleeping', 'Burn', 'Steel', 'Gentle', 'Fire', 'Dark', 'Night', 'Heat', 'Blade', 'Mist', 'Desert', 'Burnt', 'Amber', 'Neon', 'Laser', 'Hope', 'Sword', 'Black', 'Light', 'Moon', 'Sun', 'Blue', 'Aching', 'Tired', 'Angry', 'Sad', 'Fierce', 'Glowing', 'Heart', 'Swift', 'Sleep', 'Hard', 'Water', 'River', 'Lake', 'Sea', 'Mountain', 'Cold', 'Warm', 'Love', 'Dagger', 'Rust', 'Rock', 'White', 'Cool', 'Crying', 'Fate', 'Whisper', 'Cutting', 'Stream', 'Winter', 'Summer', 'Autumn', 'Spring', 'Comfort', 'Tree', 'Bird', 'Tiger', 'Plain', 'Cave', 'Tear', 'Eye', 'Hand', 'Blood', 'Changing', 'Key', 'Lost', 'Buried', 'Sunken', 'Bright', 'Slow', 'Clear', 'Steam', 'Machine', 'Shine', 'Attack', 'Brute', 'Force', 'Glow', 'Eve', 'Charge', 'Last', 'First', 'Snake', 'Rush', 'Ember', 'Move', 'Woman', 'Man', 'Child', 'Rainbow', 'Earth', 'Space', 'Reality', 'Paradigm', 'Ghost', 'Happy', 'Hate', 'Fog', 'Leaf', 'Trunk', 'Fighting', 'Fight', 'Soft', 'Lily', 'Dull', 'Skull', 'Bone', 'Cloud', 'Drip', 'Crown', 'Axe', 'Hammer', 'Star', 'Halo', 'Bar', 'Truth', 'Lie', 'Wing', 'Wind', 'Soul', 'Storm', 'Lightning', 'Thunder', 'Bear', 'Frog', 'Island', 'Note', 'Letter', 'Coded', 'Rough', 'Perfect', 'Imperfect', 'Harmony', 'Distressed', 'Broken', 'Midight', 'City', 'Jewel', 'Ruby', 'Emerald', 'Diamond', 'Saphire', 'Sphinx', 'Fox', 'Flower', 'Sonic', 'Turbo', 'Century', 'Global', 'Human', 'Life', 'Fuzzy', 'Unique', 'Dream', 'Worship', 'Strength', 'Future', 'Five', 'Edge', 'Rider', 'Runner', 'Strong', 'Flame', 'Wolf', 'Stone', 'Dreadnaught', 'Conquer', 'Blaze', 'Inferno', 'Peace', 'Tundra', 'Silent', 'Chaos', 'Chaotic', 'Serene', 'Sublime', 'Still', 'Rising', 'Fall', 'Dove', 'Protection'];
    let name = [];
    for (let i = 0; i < length; i++) {
        let randomI = Math.floor(Math.random() * words.length-1);
        name.push(words[randomI]);
    }
    return name.join(' ').replace(/ (.)/, l => l.toLowerCase());
}

export default generateName;